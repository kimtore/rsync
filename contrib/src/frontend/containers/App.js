import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UploadActions from '../actions/UploadActions'
import * as FinishedUploadActions from '../actions/FinishedUploadsActions'
import FinishedUploads from '../components/FinishedUploads'
import Uploads from '../components/Uploads'
import Dropzone from '../components/Dropzone'

const App = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    uploadActions: PropTypes.object.isRequired,
    finishedUploadActions: PropTypes.object.isRequired,
    uploads: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired
  },
  componentWillMount () {
    this.props.finishedUploadActions.getFinishedUploads()
  },
  render () {
    return (
      <div>
        <Dropzone uploadFile={this.props.uploadActions.uploadFile}/>
        <Uploads dispatch={this.props.dispatch} uploads={this.props.uploads.uploads}/>
        <FinishedUploads dispatch={this.props.dispatch} finishedUploads={this.props.uploads.finishedUploads}
                         finishedUploadActions={this.props.finishedUploadActions}/>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    routing: state.routing,
    uploads: state.uploads
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
