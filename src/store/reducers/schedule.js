import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_SCHEDULE
} from '../types/schedule'

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
  }
}

export default handleActions({
  [UPDATE_SCHEDULE](state, {
    payload
  }) {
    const list = payload.map((v) => v.attributes)
    const now = Date.now()
    state.regular.list.push(...list.filter((v) => v.mode_key === 'regular' && v.end_time > state.regular.lastEndTime))
    state.regular.list = state.regular.list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state.regular.lastEndTime = state.regular.list[state.regular.list.length - 1].end_time
    state.gachi.list.push(...list.filter((v) => v.mode_key === 'gachi' && v.end_time > state.gachi.lastEndTime))
    state.gachi.list = state.gachi.list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state.gachi.lastEndTime = state.gachi.list[state.gachi.list.length - 1].end_time
    state.league.list.push(...list.filter((v) => v.mode_key === 'league' && v.end_time > state.league.lastEndTime))
    state.league.list = state.league.list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state.league.lastEndTime = state.league.list[state.league.list.length - 1].end_time
    return {
      ...state
    }
  }
}, defaultState)
