export function judgeUpdateStatus(updatedAt) {
  const now = Date.now()
  if (now - updatedAt > 1000 * 60 * 60 * 24 * 10) {
    return true
  }
  return false
}

export function updateLocaleData(state, localeData) {
  const now = Date.now()
  if (!state.localeData[localeData.locale]) {
    state.localeData[localeData.locale] = {}
  }
  state.localeData[localeData.locale].updatedAt = now
  state.localeData[localeData.locale].data = JSON.parse(localeData.data)
}
