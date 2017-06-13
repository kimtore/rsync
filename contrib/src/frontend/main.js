import '../sass/master.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'
import createStore from './store/createStore'

const store = createStore()

ReactDOM.render(
  <AppContainer><App store={store} /></AppContainer>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render(
      <AppContainer><App store={store} /></AppContainer>,
      document.getElementById('app')
    )
  })
}
