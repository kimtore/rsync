import React, { PropTypes } from 'react'

const Upload = ({ upload }) => (
  <div className="ui active progress">
    <div className="bar" style={{transitionDuration: '300ms', width: `${upload.progress}%`}}>
      <div className="progress">{upload.progress}%</div>
    </div>
    <div className="label">Uploading file: {upload.file.name}</div>
  </div>
)

Upload.propTypes = {
  upload: PropTypes.object.isRequired
}

export default Upload
