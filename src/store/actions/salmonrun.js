import { createAction } from 'redux-actions'
import { UPDATE_SALMONRUN } from '../types/salmonrun'

import store from '../index'

import { judgeUpdateStatus } from '../../utils/updateSchedule'

export const updateSalmonrun = createAction(UPDATE_SALMONRUN, () => {
  const updatedAt = store.getState().salmonrun.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  const _ = db.command

  return db
    .collection('SalmonRunSchedule')
    .where({
      end_time: _.gt(parseInt(Date.now() / 1000))
    })
    .orderBy('end_time', 'asc')
    .get()
    .then((res) => res.data)
})
