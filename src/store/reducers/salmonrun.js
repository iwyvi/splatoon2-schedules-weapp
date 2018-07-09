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
  }
}

export default handleActions({
  [UPDATE_SALMONRUN](state, {
    payload
  }) {
    updateSalmonRun(state, payload)
    return {
      ...state
    }
  }
}, defaultState)
