import { createAction } from 'redux-actions'
import AV from 'leancloud-storage'

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

  const query = new AV.Query('Locale')
  query.equalTo('locale', locale)
  return query.first().then((result) => {
    return result.attributes
  })
})
