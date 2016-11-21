import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'
import copy from 'copy-to-clipboard'

@autobind
class CopyLink extends React.Component {
  handleClick () {
    copy(this.props.url)
  }

  render () {
    return <a className="copyToClipboard" onClick={this.handleClick}>Copy URL to clipboard</a>
  }
}

CopyLink.propTypes = {
  url: PropTypes.string.isRequired
}

export default CopyLink
