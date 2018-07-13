import {
  createAction
} from 'redux-actions'
import {
  UPDATE_REGION
} from '../types/region'

export const updateRegion = createAction(UPDATE_REGION, (region) => {
  const regionMap = ['na', 'eu', 'jp']
  if (regionMap.indexOf(region) === -1) {
    return
  }
  return region
})
