import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)
const store = createStoreWithMiddleware(rootReducer)

export default store
