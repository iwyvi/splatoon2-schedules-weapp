// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

const localeList = ['en', 'ja', 'es', 'fr', 'de', 'nl', 'it', 'ru']

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  const db = cloud.database()

  const collectionName = 'Locale'

  const updateLocaleData = async (locale, localeData) => {
    const savedLocaleData = JSON.stringify(localeData)

    const { data } = await db
      .collection(collectionName)
      .where({
        locale
      })
      .limit(1)
      .get()

    if (data.length > 0) {
      await db
        .collection(collectionName)
        .doc(data[0]._id)
        .update({
          data: {
            data: savedLocaleData
          }
        })
    } else {
      await db.collection(collectionName).add({
        data: {
          locale,
          data: savedLocaleData
        }
      })
    }
  }

  return new Promise((resolve) => {
    console.log('正在获取语言文件')
    localeList.forEach((locale) => {
      axios
        .get(`https://splatoon2.ink/data/locale/${locale}.json`)
        .then(({ data }) => {
          return updateLocaleData(locale, data)
        })
        .then(() => {
          console.log(`获取语言文件${locale}成功`)
        })
        .catch((error) => {
          console.error(error)
        })
    })
    resolve('正在获取语言文件')
  })
}
