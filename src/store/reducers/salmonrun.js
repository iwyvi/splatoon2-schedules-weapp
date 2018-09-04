import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_SALMONRUN
} from '../types/salmonrun'

import {
  updateSalmonrun
} from '../../utils/updateSchedule'

/**
 * reducer名为salmonrun
 * state名为salmonrun
 * 调用时需要state.salmonrun.salmonrun
 */
const defaultState = {
  salmonrun: {
    lastEndTime: 0,
    list: []
  },
  updatedAt: 0, // 记录上次加载时间
  activedAt: 0,
  isError: false
}

export default handleActions({
  [UPDATE_SALMONRUN](state, {
    payload,
    error
  }) {
    if (error) {
      state.isError = true
    } else if (payload) {
      updateSalmonrun(state, payload)
    }
    return {
      ...state,
      activedAt: Date.now()
    }
  }
}, defaultState)
