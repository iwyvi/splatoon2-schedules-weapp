import { createAction } from 'redux-actions'
import { UPDATE_SCHEDULE } from '../types/schedule'

import store from '../index'

import { judgeUpdateStatus } from '../../utils/updateSchedule'

export const updateSchedule = createAction(UPDATE_SCHEDULE, () => {
  const updatedAt = store.getState().schedule.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  const _ = db.command

  return db
    .collection('Schedule')
    .where({
      end_time: _.gt(parseInt(Date.now() / 1000))
    })
    .orderBy('end_time', 'asc')
    .get()
    .then((res) => res.data)
})
