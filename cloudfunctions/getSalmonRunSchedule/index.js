// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const collectionName = 'SalmonRunSchedule'

  const _ = db.command

  /**
   * 检测是否已存入这条打工信息
   * @param {object} rawSchedule
   */
  const checkScheduleExistStatus = async (rawSchedule) => {
    const { data } = await db
      .collection(collectionName)
      .where({
        start_time: _.eq(rawSchedule.start_time)
      })
      .limit(1)
      .get()

    if (data.length > 0) {
      return true
    }
    return false
  }
  /**
   * 更新打工详情
   * @param {*} rawScheduleDetailList
   */
  const updateScheduleDetail = async (rawScheduleDetailList) => {
    for (let i = rawScheduleDetailList.length - 1; i >= 0; i--) {
      const rawScheduleDetail = rawScheduleDetailList[i]

      const { data } = await db
        .collection(collectionName)
        .where({
          start_time: _.eq(rawScheduleDetail.start_time)
        })
        .limit(1)
        .get()

      if (data.length > 0 && !data[0].has_detail) {
        await db
          .collection(collectionName)
          .doc(data[0]._id)
          .update({
            data: {
              has_detail: true,
              stage: rawScheduleDetail.stage,
              weapons: rawScheduleDetail.weapons
            }
          })
      } else {
        break
      }
    }
    return true
  }
  const formatSchedule = async (rawScheduleList) => {
    const salmonRunScheduleList = []

    for (let i = rawScheduleList.length - 1; i >= 0; i--) {
      const rawSchedule = rawScheduleList[i]
      if (!(await checkScheduleExistStatus(rawSchedule))) {
        const salmonRunSchedule = {
          start_time: rawSchedule.start_time,
          end_time: rawSchedule.end_time,
          has_detail: false
        }

        salmonRunScheduleList.push(salmonRunSchedule)
      } else {
        break
      }
    }
    return salmonRunScheduleList
  }
  return new Promise((resolve, reject) => {
    console.log('正在获取打工数据')
    axios
      .get('https://splatoon2.ink/data/coop-schedules.json')
      .then(async ({ data }) => {
        const salmonRunScheduleList = await formatSchedule(data.schedules)

        if (salmonRunScheduleList.length) {
          await db.collection(collectionName).add({
            data: salmonRunScheduleList
          })
        }

        return data.details
      })
      .then((details) => {
        return updateScheduleDetail(details)
      })
      .then(() => {
        console.log('打工数据获取完成')
      })
      .catch((error) => {
        console.error(error)
      })
    resolve('正在获取打工数据')
  })
}
