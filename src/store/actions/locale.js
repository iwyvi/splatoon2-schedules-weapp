import { createAction } from 'redux-actions'

import { UPDATE_LOCALE, UPDATE_LOCALE_DATA } from '../types'
import store from '../index'
import { judgeUpdateStatus } from '../../utils/updateLocale'

export const updateLocale = createAction(UPDATE_LOCALE, (locale) => {
  const localeMap = ['en', 'ja', 'it', 'nl', 'es', 'ru', 'fr', 'de']
  if (localeMap.indexOf(locale) === -1) {
    return
  }
  return locale
})

export const updateLocaleData = createAction(UPDATE_LOCALE_DATA, (locale) => {
  const localeData = store.getState().locale.localeData
  if (localeData[locale] && !judgeUpdateStatus(localeData[locale].updatedAt)) {
    return
  }

  const db = wx.cloud.database()

  return db
    .collection('Locale')
    .where({
      locale
    })
    .limit(1)
    .get()
    .then((res) => (res.data && res.data[0] ? res.data[0] : undefined))
})
