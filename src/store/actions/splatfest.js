import { createAction } from 'redux-actions'
import { UPDATE_SPLATFEST } from '../types/splatfest'

import store from '../index'

import { judgeUpdateStatus } from '../../utils/updateSchedule'

export const updateSplatfest = createAction(UPDATE_SPLATFEST, () => {
  const updatedAt = store.getState().splatfest.updatedAt

  const region = store.getState().region.region
  const isRegionChanged = region !== store.getState().splatfest.splatfest.region

  if (!isRegionChanged && !judgeUpdateStatus(updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  return db
    .collection('Festival')
    .where({
      region
    })
    .get()
    .then((res) => ({
      list: res.data || [],
      isForce: isRegionChanged,
      region
    }))
})
