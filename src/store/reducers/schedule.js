import { handleActions } from 'redux-actions'
import { UPDATE_SCHEDULE } from '../types/schedule'

import { updateSchedule } from '../../utils/updateSchedule'

const defaultState = {
  regular: {
    lastEndTime: 0,
    list: []
  },
  gachi: {
    lastEndTime: 0,
    list: []
  },
  league: {
    lastEndTime: 0,
    list: []
  },
  updatedAt: 0, // 记录上次加载时间
  isError: false
}

export default handleActions(
  {
    [UPDATE_SCHEDULE](state, { payload, error }) {
      if (error) {
        state.isError = true
      } else if (payload) {
        updateSchedule(['regular', 'gachi', 'league'], state, payload)
      }
      return {
        ...state
      }
    }
  },
  defaultState
)
