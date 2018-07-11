import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE_SCHEDULE
} from '../types/schedule'

import store from '../index'

import {
  judgeUpdateStatus
} from '../../utils/updateSchedule'

export const updateSchedule = createAction(UPDATE_SCHEDULE, () => {
  const updatedAt = store.getState().schedule.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const query = new AV.Query('Schedule')
  query.greaterThan('end_time', parseInt(Date.now() / 1000))
  return query.find()
    .then((results) => {
      return results.map((v) => v.attributes)
    })
})
