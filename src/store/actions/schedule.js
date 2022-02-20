import { createAction } from 'redux-actions'
import { UPDATE_SCHEDULE } from '../types/schedule'

import store from '../index'

import { judgeUpdateStatus } from '../../utils/updateSchedule'

/**
 * 传入 modeKey 则只请求对应模式的数据
 */
export const updateSchedule = createAction(UPDATE_SCHEDULE, (modeKey) => {
  const updatedAt = store.getState().schedule.updatedAt

  if (!judgeUpdateStatus(updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  const _ = db.command

  return db
    .collection('Schedule')
    .where({
      end_time: _.gt(parseInt(Date.now() / 1000)),
      mode_key: modeKey
    })
    .orderBy('end_time', 'asc')
    .get()
    .then((res) => res.data)
})
