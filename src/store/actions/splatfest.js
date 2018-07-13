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
  const isRegionChanged = region !== store.getState().region.lastRegion

  if (!isRegionChanged && !judgeUpdateStatus(updatedAt)) {
    console.log(isRegionChanged)
    return
  }

  if (region === 'none') {
    return {
      list: [],
      isForce: true
    }
  }

  const query = new AV.Query('Festival')
  query.equalTo('region', region)
  return query.find()
    .then((results) => {
      return {
        list: results.map((v) => v.attributes),
        isForce: isRegionChanged
      }
    })
})
