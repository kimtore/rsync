import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from '../containers/App'
import store from '../store'

const history = syncHistoryWithStore(browserHistory, store)

export default (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}/>
    </Router>
  </Provider>
)
