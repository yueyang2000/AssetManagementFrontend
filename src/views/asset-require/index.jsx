import React from 'react'
import { connect } from 'react-redux'
import { availableAssetList } from '@/api/asset'
import { applyRequire } from '@/api/issue'
import HelpCard from '../../components/HelpCard'
import { Button, Modal, Table } from 'antd'
import { CHINESE_STATUS } from '../../utils/asset'
import { handleResponse } from '@/utils/response'

const Column = Table.Column

const changeStatusToChinese = (status) => {
  return CHINESE_STATUS[status]
}

class AssetRequire extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assetList: [],
      rowData: {},
      collectModalVis: false,
      collectModalLod: false
    }
  }

  getAsset = async () => {
    const res = await availableAssetList()
    const { data: assets, code } = res.data
    if (code === 200) {
      this.setState({
        assetList: assets
      })
    }
  }

  componentDidMount () {
    this.getAsset()
  }

  handleClickCollect = (row) => {
    this.setState({
      rowData: Object.assign({}, row),
      collectModalVis: true
    })
  }

  handleOk = (ignore) => {
    const data = { nid: this.state.rowData.nid }

    handleResponse(applyRequire(data), '请求领用', this, null,
      {
        collectModalLod: false, collectModalVis: false
      }, null, this.getAsset)
  }

  handleCancel = (ignore) => {
    this.setState({
      collectModalVis: false
    })
  }

  render () {
    const assetList = this.state.assetList
    const description = '你可以进行资产的领用'
    return (
      <div className='app-container'>
        <HelpCard title='资产管理' source={description}/>
        <Table
          bordered rowKey="name"
          dataSource={assetList}
          expandIconColumnIndex={-1}
          pagination={false}>
          <Column title="资产名称" dataIndex="name" key="name" align="center"/>
          <Column title="挂账人" dataIndex="owner" key="owner" align="center"/>
          <Column title="所属部门" dataIndex="department" key="department" align="center"/>
          <Column title="资产类型" key="type_name" align="center"
            render={(row) => (
              <span> {((row) => {
                if (row.type_name === 'AMOUNT') {
                  const str = '数量型'
                  const quantity = '数量：' + row.quantity
                  return (<span>{str}<br/>{quantity}</span>)
                } else {
                  return '条目型'
                }
              })(row)} </span>
            )}/>
          <Column title="资产状态" dataIndex="status" key="status" align="center"
            render={(row) => (
              <span> {changeStatusToChinese(row)} </span>
            )}/>
          <Column title="操作" key="action" width={200} align="center" render={(row) => (
            <span>
              <Button type="primary" shape="circle" icon="import" title="领用资产"
                onClick={this.handleClickCollect.bind(this, row)}/>
            </span>)}/>
        </Table>
        <Modal
          title="资产领用"
          visible={this.state.collectModalVis}
          confirmLoading={this.state.collectModalLod}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>是否领用资产 {this.state.rowData.name} ?</p>
        </Modal>
      </div>
    )
  }
}

export default connect(state => state.user)(AssetRequire)
