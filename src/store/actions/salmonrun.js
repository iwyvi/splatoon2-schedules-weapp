import {
  createAction
} from 'redux-actions'
import AV from 'leancloud-storage'
import {
  UPDATE_SALMONRUN
} from '../types/salmonrun'

export const updateSalmonRun = createAction(UPDATE_SALMONRUN, () => {
  const query = new AV.Query('SalmonRunSchedules')
  query.greaterThan('end_time', parseInt(Date.now() / 1000))
  return query.find()
    .then((results) => {
      return results.map((v) => v.attributes)
    })
})
