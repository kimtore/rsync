import React from 'react'
import { observer, PropTypes } from 'mobx-react'
import FinishedUploads from '../components/FinishedUploads'
import Uploads from '../components/Uploads'
import DropZone from '../components/DropZone'

@observer
class App extends React.Component {
  renderDevTools() {
    if (window.location.hash === '#devtools') {
      const DevTools = require('mobx-react-devtools').default
      return <DevTools />
    }
  }
  render() {
    const {
      store: { uploadFile, uploadsInProgress, finishedUploads }
    } = this.props

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
        {process.env.NODE_ENV !== 'production' && this.renderDevTools()}
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.observableObject
}

export default App
