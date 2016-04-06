import React, { PropTypes } from 'react'
import copy from 'copy-to-clipboard'

export default React.createClass({
  propTypes: {
    finishedUpload: PropTypes.object.isRequired
  },
  handleClickCopyToClipboard () {
    copy(this.props.finishedUpload.url)
  },
  render () {
    let finishedUpload = { ...this.props.finishedUpload }
    finishedUpload.file = finishedUpload.file || ''
    return (
      <tr>
        <td>{finishedUpload.file.substring(finishedUpload.file.lastIndexOf('/') + 1)}</td>
        <td>{new Date(finishedUpload.expiry).toString()}</td>
        <td><a href={finishedUpload.url}>{finishedUpload.url}</a></td>
        <td><a className='copyToClipboard' onClick={this.handleClickCopyToClipboard}>Copy to clipboard</a></td>
      </tr>
    )
  }
})

