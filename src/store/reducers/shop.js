import {
  handleActions
} from 'redux-actions'
import {
  UPDATE_SHOP
} from '../types/shop'

import {
  updateShop
} from '../../utils/updateSchedule'

const defaultState = {
  shop: {
    lastEndTime: 0,
    list: []
  },
  updatedAt: 0, // 记录上次加载时间
  activedAt: 0,
  isError: false,
  reloadCount: 0
}

export default handleActions({
  [UPDATE_SHOP](state, {
    payload,
    error
  }) {
    if (error) {
      state.isError = true
    } else if (payload) {
      updateShop(state, payload)
    }

    return {
      ...state,
      activedAt: Date.now()
    }
  }
}, defaultState)
