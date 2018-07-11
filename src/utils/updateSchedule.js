/**
 * 通过上次更新时间判断现在是否需要进行新的更新请求
 * @param {number} updatedAt 上次更新时间
 */
export function judgeUpdateStatus(updatedAt) {
  const now = Date.now()
  const updatedDate = new Date(updatedAt)
  if (updatedDate.getHours % 2 === 0) {
    if (now - ((60 * 2 - updatedDate.getMinutes()) * 60 * 1000) > updatedAt) {
      return true
    }
    return false
  }
  if (now - ((60 - updatedDate.getMinutes()) * 60 * 1000) > updatedAt) {
    return true
  }
  return false
}

export function updateSchedule(modeList, state, list) {
  const now = Date.now()
  modeList.forEach((mode) => {
    state[mode].list.push(...list.filter((v) => v.mode_key === mode && v.end_time > state[mode].lastEndTime))
    state[mode].list = state[mode].list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state[mode].list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
    state[mode].lastEndTime = state[mode].list[state[mode].list.length - 1].end_time
  })
  state.updatedAt = now
}

export function updateSalmonRun(state, list) {
  const now = Date.now()
  state.salmonRun.list.push(...list.filter((v) => v.end_time > state.salmonRun.lastEndTime))
  state.salmonRun.list = state.salmonRun.list.filter((v) => parseInt(`${v.end_time}000`) > now)
  state.salmonRun.list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
  state.salmonRun.lastEndTime = state.salmonRun.list[state.salmonRun.list.length - 1].end_time
  state.updatedAt = now
}

export function updateShop(state, list) {
  const now = Date.now()
  state.shop.list.push(...list.filter((v) => v.end_time > state.shop.lastEndTime))
  state.shop.list = state.shop.list.filter((v) => parseInt(`${v.end_time}000`) > now)
  state.shop.list.sort((v1, v2) => v1.end_time < v2.end_time ? -1 : 1)
  state.shop.lastEndTime = state.shop.list[state.shop.list.length - 1].end_time
  state.updatedAt = now
}
