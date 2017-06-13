import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'

const Upload = ({ upload, abortUpload, removeUpload }) =>
  <tr>
    <td>
      <MediaQuery maxWidth={767} component="span">File: </MediaQuery>
      {upload.file}
    </td>
    <td>
      <div
        className={`ui progress ${upload.status === 'Uploading'
          ? 'active'
          : ''}`}
        style={{ width: '100%' }}
      >
        <div
          className="bar"
          style={{ transitionDuration: '300ms', width: `${upload.progress}%` }}
        >
          <div className="progress">{upload.progress}%</div>
        </div>
      </div>
    </td>
    <td>
      <MediaQuery maxWidth={767} component="span">Status: </MediaQuery>
      {upload.status}
    </td>
    <td>
      {upload.status === 'Uploading'
        ? <a onClick={() => abortUpload(upload.id)}>Abort</a>
        : <a onClick={() => removeUpload(upload.id)}>Remove</a>}
    </td>
  </tr>

Upload.propTypes = {
  upload: PropTypes.object.isRequired,
  abortUpload: PropTypes.func.isRequired,
  removeUpload: PropTypes.func.isRequired
}

export default Upload
