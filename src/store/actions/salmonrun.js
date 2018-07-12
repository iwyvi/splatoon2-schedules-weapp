import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE_SALMONRUN
} from '../types/salmonrun'

import store from '../index'

import {
  judgeUpdateStatus
} from '../../utils/updateSchedule'

export const updateSalmonrun = createAction(UPDATE_SALMONRUN, () => {
  const updatedAt = store.getState().salmonrun.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const query = new AV.Query('SalmonRunSchedules')
  query.greaterThan('end_time', parseInt(Date.now() / 1000))
  return query.find()
    .then((results) => {
      return results.map((v) => v.attributes)
    })
})
