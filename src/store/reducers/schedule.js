import {
  handleActions
} from 'redux-actions'
import {
  UPDATE
} from '../types/schedule'

const defaultState = {
  regular: [],
  gachi: [],
  league: []
}

export default handleActions({
  [UPDATE](state, action) {
    state[action.mode].push(...action.list)
    return {
      ...state
    }
  }
}, defaultState)
