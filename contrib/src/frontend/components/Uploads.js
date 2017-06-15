import React from 'react'
import PropTypes from 'prop-types'
import Upload from './Upload'
import MediaQuery from 'react-responsive'
import { observer } from 'mobx-react'

const Uploads = observer(({ uploads }) =>
  <div className="uploads">
    {uploads.length > 0 &&
      <table className="ui celled table">
        <MediaQuery minWidth={768}>
          <thead>
            <tr>
              <th>File</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
        </MediaQuery>
        <tbody>
          {uploads.map(upload => <Upload key={upload.id} upload={upload} />)}
        </tbody>
      </table>}
  </div>
)

Uploads.propTypes = {
  uploads: PropTypes.array.isRequired
}

export default Uploads
