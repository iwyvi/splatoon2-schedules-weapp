import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_REGION
} from '../types/region'

const defaultState = {
  region: wx.getStorageSync('region') || 'none'
}

export default handleActions({
  [UPDATE_REGION](state, {
    payload
  }) {
    if (payload) {
      wx.setStorageSync('region', payload)
      state.region = payload
    }
    return {
      ...state
    }
  }
}, defaultState)
