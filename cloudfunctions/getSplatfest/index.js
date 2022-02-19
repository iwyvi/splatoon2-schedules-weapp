// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  const collectionName = 'Festival'

  const _ = db.command

  const checkFestivalStatus = async (region, rawFestival) => {
    const { data } = await db
      .collection(collectionName)
      .where({
        region: _.eq(region),
        festival_id: _.eq(rawFestival.festival_id)
      })
      .limit(1)
      .get()

    if (data.length > 0) {
      if (data[0].has_result) {
        return {
          exist: true,
          hasResult: true
        }
      } else {
        return {
          exist: true,
          hasResult: false,
          object: data[0]
        }
      }
    }
    return {
      exist: false,
      hasResult: false
    }
  }

  const formatFestivals = async (region, rawFestivals) => {
    const rawFestivalsList = rawFestivals.festivals
    const rawFestivalResultsList = rawFestivals.results
    const festivalsList = []
    for (let i = 0; i < rawFestivalsList.length; i++) {
      const rawFestival = rawFestivalsList[i]

      const resultIndex = rawFestivalResultsList.findIndex((v) => {
        return v.festival_id === rawFestival.festival_id
      })

      const rawFestivalResult =
        resultIndex !== -1 ? rawFestivalResultsList[resultIndex] : null

      const status = await checkFestivalStatus(region, rawFestival)
      if (status.exist) {
        if (status.hasResult) {
          break
        } else if (rawFestivalResult) {
          const festival = status.object

          await db
            .collection(collectionName)
            .doc(festival._id)
            .update({
              data: {
                ...rawFestivalResult,
                has_result: true
              }
            })
        }
      } else {
        let festival = {
          region,
          has_result: false,
          ...rawFestival
        }
        if (rawFestivalResult) {
          festival = {
            ...festival,
            ...rawFestivalResult,
            has_result: true
          }
        }
        festivalsList.push(festival)
      }
    }
    return festivalsList
  }

  return new Promise((resolve) => {
    console.log('正在获取祭典信息')
    axios
      .get('https://splatoon2.ink/data/festivals.json')
      .then(async ({ data }) => {
        const festivalsList = []
        festivalsList.push(
          ...(await formatFestivals('na', data.na)),
          ...(await formatFestivals('eu', data.eu)),
          ...(await formatFestivals('jp', data.jp))
        )

        if (festivalsList.length) {
          return db.collection(collectionName).add({
            data: festivalsList
          })
        }
      })
      .then(() => {
        console.log('祭典信息获取成功')
      })
      .catch((error) => {
        console.error(error)
      })
    resolve('正在获取祭典信息')
  })
}
