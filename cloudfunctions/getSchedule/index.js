// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  const db = cloud.database()

  const collectionName = 'Schedule'

  const _ = db.command

  /**
   * 检查此条是否已经保存
   * @param {object} rawSchedule
   */
  const checkScheduleExistStatus = async (rawSchedule) => {
    const { data } = await db
      .collection(collectionName)
      .where({
        mode_key: _.eq(rawSchedule.game_mode.key),
        start_time: _.eq(rawSchedule.start_time)
      })
      .limit(1)
      .get()

    if (data.length > 0) {
      return true
    }
    return false
  }

  const formatSchedule = async (rawScheduleList) => {
    const scheduleList = []

    for (let i = rawScheduleList.length - 1; i >= 0; i--) {
      const rawSchedule = rawScheduleList[i]
      if (!(await checkScheduleExistStatus(rawSchedule))) {
        const schedule = {
          ...rawSchedule,
          mode_key: rawSchedule.game_mode.key
        }

        scheduleList.push(schedule)
      } else {
        break
      }
    }
    return scheduleList
  }

  return new Promise((resolve, reject) => {
    console.log('正在获取日程')
    axios
      .get('https://splatoon2.ink/data/schedules.json')
      .then(async ({ data }) => {
        const scheduleList = []
        scheduleList.push(
          ...(await formatSchedule(data.regular)),
          ...(await formatSchedule(data.gachi)),
          ...(await formatSchedule(data.league))
        )

        if (scheduleList.length) {
          return db.collection(collectionName).add({
            data: scheduleList
          })
        }
      })
      .then(() => {
        console.log('日程获取完成')
      })
      .catch((error) => {
        console.error(error)
      })
    resolve('正在获取日程')
  })
}
