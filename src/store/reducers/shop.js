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
  }
}

export default handleActions({
  [UPDATE_SHOP](state, {
    payload
  }) {
    updateShop(state, payload)
    return {
      ...state
    }
  }
}, defaultState)
