import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import uploads from './uploads'

const rootReducer = combineReducers({
  uploads,
  routing: routerReducer
})

export default rootReducer
