import React, { PropTypes } from 'react'
import CopyLink from './CopyLink'

const FinishedUpload = ({ finishedUpload }) => (
  <tr>
    <td>{(finishedUpload.file || '').substring(finishedUpload.file.lastIndexOf('/') + 1)}</td>
    <td>{new Date(finishedUpload.expiry).toString()}</td>
    <td><a href={finishedUpload.url}>{finishedUpload.url}</a></td>
    <td><CopyLink url={finishedUpload.url} /></td>
  </tr>
)

FinishedUpload.propTypes = {
  finishedUpload: PropTypes.object.isRequired
}

export default FinishedUpload
