export function updateSchedule(modeList, state, list) {
  const now = Date.now()
  modeList.forEach((mode) => {
    state[mode].list.push(...list.filter((v) => v.mode_key === mode && v.end_time > state[mode].lastEndTime))
    state[mode].list = state[mode].list.filter((v) => parseInt(`${v.end_time}000`) > now)
    state[mode].list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
    state[mode].lastEndTime = state[mode].list[state[mode].list.length - 1].end_time
  })
}

export function updateSalmonRun(state, list) {
  const now = Date.now()
  state.salmonRun.list.push(...list.filter((v) => v.end_time > state.salmonRun.lastEndTime))
  state.salmonRun.list = state.salmonRun.list.filter((v) => parseInt(`${v.end_time}000`) > now)
  state.salmonRun.list.sort((v1, v2) => v1.start_time < v2.start_time ? -1 : 1)
  state.salmonRun.lastEndTime = state.salmonRun.list[state.salmonRun.list.length - 1].end_time
}
