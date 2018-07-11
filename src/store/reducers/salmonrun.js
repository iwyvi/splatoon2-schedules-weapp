import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_SALMONRUN
} from '../types/salmonrun'

import {
  updateSalmonRun
} from '../../utils/updateSchedule'

/**
 * reducer名为salmonrun
 * state名为salmonRun
 * 调用时需要state.salmonrun.salmonRun
 */
const defaultState = {
  salmonRun: {
    lastEndTime: 0,
    list: []
  },
  updatedAt: 0, // 记录上次加载时间
  activedAt: 0,
  isError: false,
  reloadCount: 0
}

export default handleActions({
  [UPDATE_SALMONRUN](state, {
    payload,
    error
  }) {
    if (error) {
      state.isError = true
    } else if (payload) {
      updateSalmonRun(state, payload)
    }
    return {
      ...state,
      activedAt: Date.now()
    }
  }
}, defaultState)
