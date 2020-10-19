import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import BoxCard from './index'
import PERMISSION from '@/utils/permission'
const mockStore = configureStore([])
describe('My Connected React-Redux Component', () => {
  let store
  let component
  beforeEach(() => {
    store = mockStore({
      user: {
        name: 'admin',
        role: [PERMISSION.SYSTEM, PERMISSION.STAFF, PERMISSION.IT, PERMISSION.ASSET]
      }
    })
    component = renderer.create(
      <Provider store={store}>
        <BoxCard />
      </Provider>
    )
  })
  it('should render with given state from Redux store', () => {
    component.root.findByProps({ title: '用户信息' })
    // console.log(component.root.findByType('img').props)
  })
  it('should dispatch an action on button click', () => {
  })
})
