import { combineReducers } from 'redux'
import uploads from './uploads'
import finishedUploads from './finishedUploads'
import dragOver from './dragOver'

const rootReducer = combineReducers({
  uploads,
  finishedUploads,
  dragOver
})

export default rootReducer
