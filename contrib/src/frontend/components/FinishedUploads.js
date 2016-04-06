import React, { PropTypes } from 'react'
import FinishedUpload from './FinishedUpload'

export default React.createClass({
  propTypes: {
    finishedUploads: PropTypes.array.isRequired
  },
  renderEmpty () {
    let emptyRows = []
    for (let i = 0; i < 5 - this.props.finishedUploads.length; i++) {
      emptyRows.push(
        <tr key={i}>
          <td />
          <td />
          <td />
          <td />
        </tr>
      )
    }
    return emptyRows
  },
  render () {
    return (
      <div>
        <table className='ui celled table'>
          <thead>
          <tr>
            <th>File</th>
            <th>Expiry</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {this.props.finishedUploads.map(finishedUpload => {
            return (
              <FinishedUpload key={finishedUpload.slug} finishedUpload={finishedUpload}/>
            )
          })}
          {this.renderEmpty()}
          </tbody>
        </table>
      </div>
    )
  }
})

