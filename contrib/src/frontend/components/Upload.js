import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import { observer } from 'mobx-react'
import Status from '../constants/Status'

const Upload = observer(({ upload, abortUpload, removeUpload }) =>
  <tr>
    <td>
      <MediaQuery maxWidth={767} component="span">
        File:{' '}
      </MediaQuery>
      {upload.filename}
    </td>
    <td>
      <div
        className={`ui progress ${upload.status === Status.UPLOADING
          ? 'active'
          : ''}`}
        style={{ width: '100%' }}
      >
        <div
          className="bar"
          style={{ transitionDuration: '300ms', width: `${upload.progress}%` }}
        >
          <div className="progress">
            {upload.progress}%
          </div>
        </div>
      </div>
    </td>
    <td>
      <MediaQuery maxWidth={767} component="span">
        Status:{' '}
      </MediaQuery>
      {upload.status}
    </td>
    <td>
      {getActions(upload, removeUpload)}
    </td>
  </tr>
)

const getActions = upload => {
  if (upload.status === Status.UPLOADING) {
    return <a onClick={() => upload.abortUpload()}>Abort</a>
  } else if (upload.status === Status.FINISHING) {
    return null
  } else {
    return (
      <span>
        <a onClick={() => upload.removeUpload()}>Remove</a> |{' '}
        <a onClick={() => upload.restart()}>Restart</a>
      </span>
    )
  }
}

Upload.propTypes = {
  upload: PropTypes.object.isRequired
}

export default Upload
