import { handleActions } from 'redux-actions'
import { UPDATE_SPLATFEST } from '../types/splatfest'

import { updateSplatfest } from '../../utils/updateSchedule'

const defaultState = {
  splatfest: {
    lastEndTime: 0,
    region: 'na',
    list: []
  },
  updatedAt: 0,
  isError: false
}

export default handleActions(
  {
    [UPDATE_SPLATFEST](state, { payload, error }) {
      if (error) {
        state.isError = true
      } else if (payload) {
        updateSplatfest(state, payload.list, payload.region, payload.isForce)
      }
      return {
        ...state
      }
    }
  },
  defaultState
)
