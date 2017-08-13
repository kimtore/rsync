import React from 'react';
import { observer } from 'mobx-react';
import FinishedUploads from '../components/FinishedUploads';
import Uploads from '../components/Uploads';
import DropZone from '../components/DropZone';
import { UploadsStore } from '../store/UploadsStore';

type Props = {
  store: UploadsStore;
};

@observer
class App extends React.Component<Props> {
  /*renderDevTools() {
    if (window.location.hash === '#devtools') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools />;
    }
  }*/
  render() {
    const { store: { uploadFile, uploadsInProgress, finishedUploads } } = this.props;

    return (
      <div>
        <DropZone uploadFile={uploadFile} />
        <Uploads uploads={uploadsInProgress} />
        <FinishedUploads finishedUploads={finishedUploads} />
        <footer className="footer">
          <a className="ui button" href="/logout/">
            Logout
          </a>
        </footer>
        {/*process.env.NODE_ENV !== 'production' && this.renderDevTools()*/}
      </div>
    );
  }
}

export default App;
