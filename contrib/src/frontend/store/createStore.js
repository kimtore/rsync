import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()
const middleware = [thunkMiddleware, loggerMiddleware]

export default (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    ))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
