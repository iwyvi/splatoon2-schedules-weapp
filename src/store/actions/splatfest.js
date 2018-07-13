import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE_SPLATFEST
} from '../types/splatfest'

import store from '../index'

import {
  judgeUpdateStatus
} from '../../utils/updateSchedule'

export const updateSplatfest = createAction(UPDATE_SPLATFEST, () => {
  const updatedAt = store.getState().splatfest.updatedAt

  const region = store.getState().region.region
  const isRegionChanged = region !== store.getState().splatfest.splatfest.region

  if (!isRegionChanged && !judgeUpdateStatus(updatedAt)) {
    return
  }

  const query = new AV.Query('Festival')
  query.equalTo('region', region)
  return query.find()
    .then((results) => {
      return {
        list: results.map((v) => v.attributes),
        isForce: isRegionChanged,
        region
      }
    })
})
