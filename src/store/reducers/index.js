import {
  combineReducers
} from 'redux'
import schedule from './schedule'
import salmonrun from './salmonrun'
import shop from './shop'
import region from './region'
import splatfest from './splatfest'

export default combineReducers({
  schedule,
  salmonrun,
  shop,
  region,
  splatfest
})
