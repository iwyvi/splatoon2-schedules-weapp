import { handleActions } from 'redux-actions'
import { UPDATE_LOCALE, UPDATE_LOCALE_DATA } from '../types'

import { updateLocaleData } from '../../utils/updateLocale'

const rawLocalData = wx.getStorageSync('locale-data')
const defaultState = {
  locale: wx.getStorageSync('locale') || 'en',
  localeData: rawLocalData ? JSON.parse(rawLocalData) : {}
}

export default handleActions(
  {
    [UPDATE_LOCALE](state, { payload }) {
      if (payload) {
        wx.setStorageSync('locale', payload)
        state.locale = payload
      }
      return {
        ...state
      }
    },
    [UPDATE_LOCALE_DATA](state, { payload }) {
      if (payload) {
        updateLocaleData(state, payload)
        wx.setStorageSync('locale-data', JSON.stringify(state.localeData))
      }
      return {
        ...state
      }
    }
  },
  defaultState
)
