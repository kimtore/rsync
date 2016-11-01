import React, { PropTypes } from 'react'
import FinishedUpload from './FinishedUpload'
import times from '../utils/times'

const FinishedUploads = ({ finishedUploads }) => (
  <div>
    <table className="ui celled table">
      <thead>
      <tr>
        <th>File</th>
        <th>Expiry</th>
        <th>URL</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      {finishedUploads.map(finishedUpload =>
        <FinishedUpload key={finishedUpload.slug} finishedUpload={finishedUpload} />)}
      {times(5 - finishedUploads.length, i => (
        <tr key={i}>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
)

FinishedUploads.propTypes = {
  finishedUploads: PropTypes.array.isRequired
}

export default FinishedUploads
