import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE_SHOP
} from '../types/shop'

import store from '../index'

import {
  judgeUpdateStatus
} from '../../utils/updateSchedule'

export const updateShop = createAction(UPDATE_SHOP, () => {
  const updatedAt = store.getState().shop.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const query = new AV.Query('Gear')
  query.greaterThan('end_time', parseInt(Date.now() / 1000))
  return query.find()
    .then((results) => {
      return results.map((v) => v.attributes)
    })
})
