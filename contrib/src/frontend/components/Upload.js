import React, { PropTypes } from 'react'

export default React.createClass({
  propTypes: {
    upload: PropTypes.object.isRequired
  },
  render () {
    return (
      <div className='ui active progress'>
        <div className='bar' style={{transitionDuration: '300ms', width: this.props.upload.progress + '%'}}>
          <div className='progress'>{this.props.upload.progress}%</div>
        </div>
        <div className='label'>Uploading file: {this.props.upload.file.name}</div>
      </div>
    )
  }
})
