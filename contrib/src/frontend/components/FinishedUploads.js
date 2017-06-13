import React from 'react'
import PropTypes from 'prop-types'
import FinishedUpload from './FinishedUpload'
import times from '../utils/times'
import MediaQuery from 'react-responsive'

const FinishedUploads = ({ finishedUploads, deleteUpload }) =>
  <div className="finished-uploads">
    <table className="ui celled table">
      <MediaQuery minWidth={768}>
        <thead>
          <tr>
            <th>File</th>
            <th>Expiry</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
      </MediaQuery>
      <tbody>
        {finishedUploads.map(finishedUpload =>
          <FinishedUpload
            key={finishedUpload.slug}
            finishedUpload={finishedUpload}
            deleteUpload={deleteUpload}
          />
        )}
        {times(5 - finishedUploads.length, i =>
          <tr key={i}>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

FinishedUploads.propTypes = {
  finishedUploads: PropTypes.array.isRequired,
  deleteUpload: PropTypes.func.isRequired
}

export default FinishedUploads
