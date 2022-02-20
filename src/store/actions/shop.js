import { createAction } from 'redux-actions'
import { UPDATE_SHOP } from '../types/shop'

import store from '../index'

import { judgeUpdateStatus } from '../../utils/updateSchedule'

export const updateShop = createAction(UPDATE_SHOP, () => {
  const updatedAt = store.getState().shop.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  const _ = db.command

  return db
    .collection('Gear')
    .where({
      end_time: _.gt(parseInt(Date.now() / 1000))
    })
    .orderBy('end_time', 'asc')
    .get()
    .then((res) => res.data)
})
