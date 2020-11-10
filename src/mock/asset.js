import getReturnFunc from './utils'

export default {
  assetList: () => {
    return {
      code: 200,
      data: 'assetList'
    }
  },
  addAsset: getReturnFunc('addAsset'),
  assetCategoryList: getReturnFunc('assetCategoryList'),
  editAsset: getReturnFunc('editAsset'),
  addAssetCategory: getReturnFunc('addAssetCategory'),
  editAssetCategory: getReturnFunc('editAssetCategory'),
  deleteAssetCategory: getReturnFunc('deleteAssetCategory'),
  getAssetHistory: getReturnFunc('getAssetHistory'),
  personalAssetList: getReturnFunc('personalAssetList'),
  availableAssetList: getReturnFunc('availableAssetList'),
  assetQuery: getReturnFunc('assetQuery'),
  getCustomProp: getReturnFunc('getCustomProp'),
  editCustomProp: getReturnFunc('editCustomProp'),
  assetRetire: getReturnFunc('assetRetire'),
  assetAllocate: getReturnFunc('assetAllocate')
}
