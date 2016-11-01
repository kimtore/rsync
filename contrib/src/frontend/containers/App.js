import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UploadActions from '../actions/UploadActions'
import * as FinishedUploadActions from '../actions/FinishedUploadsActions'
import FinishedUploads from '../components/FinishedUploads'
import Uploads from '../components/Uploads'
import Dropzone from '../components/Dropzone'

class App extends React.Component {
  componentWillMount () {
    this.props.finishedUploadActions.getFinishedUploads()
  }

  render () {
    const { uploadActions, uploads, finishedUploads } = this.props
    return (
      <div>
        <Dropzone uploadFile={uploadActions.uploadFile} />
        <Uploads uploads={uploads} />
        <FinishedUploads finishedUploads={finishedUploads} />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uploadActions: PropTypes.object.isRequired,
  finishedUploadActions: PropTypes.object.isRequired,
  uploads: PropTypes.array.isRequired,
  finishedUploads: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  return {
    uploads: state.uploads,
    finishedUploads: state.finishedUploads
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
    uploadActions: bindActionCreators(UploadActions, dispatch),
    finishedUploadActions: bindActionCreators(FinishedUploadActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
