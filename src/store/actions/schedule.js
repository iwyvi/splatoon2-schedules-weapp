import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE
} from '../types/schedule'

export const updateSchedule = createAction(UPDATE, () => {
  const query = new AV.Query('Schedule')
  query.greaterThan('end_time', parseInt(Date.now() / 1000))
  return query.find()
    .then((results) => {
      console.log(results)
    })
})
