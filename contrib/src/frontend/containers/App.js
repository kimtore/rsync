import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UploadActions from '../actions/UploadActions'
import * as FinishedUploadActions from '../actions/FinishedUploadsActions'
import FinishedUploads from '../components/FinishedUploads'
import Uploads from '../components/Uploads'
import DropZone from '../components/DropZone'

class App extends React.Component {
  componentWillMount() {
    this.props.finishedUploadActions.getFinishedUploads()
  }

  render() {
    const { uploadActions, uploads, finishedUploads } = this.props

    return (
      <div>
        <DropZone uploadFile={uploadActions.uploadFile} />
        <Uploads
          uploads={uploads}
          abortUpload={uploadActions.abortUpload}
          removeUpload={uploadActions.removeUpload}
        />
        <FinishedUploads
          finishedUploads={finishedUploads}
          deleteUpload={uploadActions.deleteUpload}
        />
        <a className="ui button" href="/logout/">Logout</a>
      </div>
    )
  }
}

App.propTypes = {
  uploadActions: PropTypes.object.isRequired,
  finishedUploadActions: PropTypes.object.isRequired,
  uploads: PropTypes.array.isRequired,
  finishedUploads: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  uploads: state.uploads,
  finishedUploads: state.finishedUploads,
  dragOver: state.dragOver
})

const mapDispatchToProps = dispatch => ({
  uploadActions: bindActionCreators(UploadActions, dispatch),
  finishedUploadActions: bindActionCreators(FinishedUploadActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
