import { combineReducers } from 'redux'
import uploads from './uploads'
import finishedUploads from './finishedUploads'

const rootReducer = combineReducers({
  uploads,
  finishedUploads
})

export default rootReducer
