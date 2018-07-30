/**
 * 通过上次更新时间判断现在是否需要进行新的更新请求
 * @param {number} updatedAt 上次更新时间
 */
export function judgeUpdateStatus(updatedAt) {
  const now = Date.now()
  const updatedDate = new Date(updatedAt)
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

export function updateSalmonrun(state, list) {
  const now = Date.now()
  state.salmonrun.list.push(...list.filter((v) => v.end_time > state.salmonrun.lastEndTime))
  state.salmonrun.list = state.salmonrun.list.filter((v) => parseInt(`${v.end_time}000`) > now)
  state.salmonrun.list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
  state.salmonrun.lastEndTime = state.salmonrun.list[state.salmonrun.list.length - 1].end_time
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

/**
 * 更新祭典信息
 * @param {*} state state
 * @param {*} list list
 * @param {string} region region
 * @param {*} isForce 是否强制更新
 */
export function updateSplatfest(state, list, region, isForce = false) {
  const now = Date.now()
  if (isForce) {
    state.splatfest.list = list
  } else {
    state.splatfest.list.push(...list.filter((v) => v.times.end > state.splatfest.lastEndTime))
  }
  state.splatfest.list.sort((v1, v2) => v1.times.end < v2.times.end ? 1 : -1)
  state.splatfest.lastEndTime = state.splatfest.list[0].times.end
  state.splatfest.region = region
  // TODO: 祭典信息可以缓存起来
  state.updatedAt = now
}
