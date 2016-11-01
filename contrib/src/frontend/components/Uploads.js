import React, { PropTypes } from 'react'
import Upload from './Upload'

const Uploads = ({ uploads }) => (
  <div>
    {uploads.map(upload => <Upload key={upload.id} upload={upload} />)}
  </div>
)

Uploads.propTypes = {
  uploads: PropTypes.array.isRequired
}

export default Uploads
