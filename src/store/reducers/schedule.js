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

function updateSchedule(modeList, state, list) {
  const now = Date.now()
  modeList.forEach((mode) => {
    state[mode].list.push(...list.filter((v) => v.mode_key === mode && v.end_time > state[mode].lastEndTime))
    state[mode].list = state[mode].list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state[mode].list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
    state[mode].lastEndTime = state[mode].list[state[mode].list.length - 1].end_time
  })
}

export default handleActions({
  [UPDATE_SCHEDULE](state, {
    payload
  }) {
    const list = payload.map((v) => v.attributes)
    updateSchedule(['regular', 'gachi', 'league'], state, list)
    return {
      ...state
    }
  }
}, defaultState)
