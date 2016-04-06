import React, { PropTypes } from 'react'
import Upload from './Upload'

export default React.createClass({
  propTypes: {
    uploads: PropTypes.array.isRequired
  },
  render () {
    let uploads
    if (this.props.uploads) {
      uploads = Object.keys(this.props.uploads).map(key => {
        let upload = this.props.uploads[ key ]
        return <Upload key={key} upload={upload}/>
      })
    }
    return (
      <div>
        {uploads}
      </div>
    )
  }
})
