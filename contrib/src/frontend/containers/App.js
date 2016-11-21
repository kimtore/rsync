import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UploadActions from '../actions/UploadActions'
import * as FinishedUploadActions from '../actions/FinishedUploadsActions'
import * as DragOverActions from '../actions/DragOverActions'
import FinishedUploads from '../components/FinishedUploads'
import Uploads from '../components/Uploads'
import Dropzone from '../components/Dropzone'

class App extends React.Component {
  componentWillMount () {
    this.props.finishedUploadActions.getFinishedUploads()
  }

  render () {
    const { uploadActions, dragOverActions, dragOver, uploads, finishedUploads } = this.props
    return (
      <div>
        <Dropzone uploadFile={uploadActions.uploadFile}
                  startDragOver={dragOverActions.startDragOver}
                  endDragOver={dragOverActions.endDragOver}
                  dragOver={dragOver}
        />
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
  dragOverActions: PropTypes.object.isRequired,
  uploads: PropTypes.array.isRequired,
  finishedUploads: PropTypes.array.isRequired,
  dragOver: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    uploads: state.uploads,
    finishedUploads: state.finishedUploads,
    dragOver: state.dragOver
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch: dispatch,
    uploadActions: bindActionCreators(UploadActions, dispatch),
    finishedUploadActions: bindActionCreators(FinishedUploadActions, dispatch),
    dragOverActions: bindActionCreators(DragOverActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
