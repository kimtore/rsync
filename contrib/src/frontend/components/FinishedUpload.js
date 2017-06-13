import React from 'react'
import PropTypes from 'prop-types'
import CopyLink from './CopyLink'
import TimeRemaining from './TimeRemaining'
import MediaQuery from 'react-responsive'

const FinishedUpload = ({ finishedUpload, deleteUpload }) =>
  <tr>
    <td>
      <MediaQuery maxWidth={767} component="span">File: </MediaQuery>
      {finishedUpload.file.substring(finishedUpload.file.lastIndexOf('/') + 1)}
    </td>
    <td>
      <MediaQuery maxWidth={767} component="span">Expiry: </MediaQuery>
      <TimeRemaining expiry={finishedUpload.expiry} />
    </td>
    <td><a href={finishedUpload.url}>{finishedUpload.url}</a></td>
    <td>
      <CopyLink url={finishedUpload.url} /> |{' '}
      <a onClick={() => deleteUpload(finishedUpload.id)}>Delete</a>
    </td>
  </tr>

FinishedUpload.propTypes = {
  finishedUpload: PropTypes.object.isRequired,
  deleteUpload: PropTypes.func.isRequired
}

export default FinishedUpload
