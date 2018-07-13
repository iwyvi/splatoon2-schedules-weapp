import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_SPLATFEST
} from '../types/splatfest'

import {
  updateSplatfest
} from '../../utils/updateSchedule'

const defaultState = {
  splatfest: {
    lastEndTime: 0,
    list: []
  },
  updatedAt: 0,
  activedAt: 0,
  isError: false,
  reloadCount: 0
}

export default handleActions({
  [UPDATE_SPLATFEST](state, {
    payload,
    error
  }) {
    if (error) {
      state.isError = true
    } else if (payload) {
      updateSplatfest(state, payload.list, payload.isForce)
    }
    return {
      ...state,
      activedAt: Date.now()
    }
  }
}, defaultState)
