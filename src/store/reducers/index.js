import {
  combineReducers
} from 'redux'
import schedule from './schedule'
import salmonrun from './salmonrun'

export default combineReducers({
  schedule,
  salmonrun
})
