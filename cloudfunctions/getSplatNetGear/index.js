// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const collectionName = 'Gear'

  const _ = db.command

  const checkGearExistStatus = async (rawGear) => {
    const { data } = await db
      .collection(collectionName)
      .where({
        end_time: _.eq(rawGear.end_time)
      })
      .limit(1)
      .get()

    if (data.length) {
      return true
    }
    return false
  }

  const formatGears = async (rawGearsList) => {
    const gearsList = []

    for (let i = rawGearsList.length - 1; i >= 0; i--) {
      const rawGear = rawGearsList[i]
      if (!(await checkGearExistStatus(rawGear))) {
        gearsList.push(rawGear)
      } else {
        break
      }
    }
    return gearsList
  }

  return new Promise((resolve) => {
    console.log('正在获取装备信息')
    axios
      .get('https://splatoon2.ink/data/merchandises.json')
      .then(async ({ data }) => {
        const gearsList = await formatGears(data.merchandises)
        if (gearsList.length) {
          return db.collection(collectionName).add({
            data: gearsList
          })
        }
      })
      .then(() => {
        console.log('装备信息获取成功')
      })
      .catch((error) => {
        console.error(error)
      })
    resolve('正在获取装备信息')
  })
}
