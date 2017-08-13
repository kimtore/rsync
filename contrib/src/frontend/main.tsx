import '../sass/master.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import UploadStore from './store/UploadsStore';
import * as mobx from 'mobx';

mobx.useStrict(true);

if (process.env.NODE_ENV != 'production') {
  (window as any).uploadsStore = UploadStore;
}

/*
if (process.env.NODE_ENV !== 'production') {
  const enableLogging = require('mobx-logger').enableLogging;
  enableLogging({
    reaction: false,
  });
}
*/

ReactDOM.render(
  <AppContainer>
    <App store={UploadStore} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render(
      <AppContainer>
        <App store={UploadStore} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

UploadStore.fetchUploadsFromServer();
