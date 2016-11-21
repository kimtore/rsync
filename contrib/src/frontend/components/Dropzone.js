import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'

@autobind
class Dropzone extends React.Component {
  componentWillMount () {
    document.body.addEventListener('dragover', this.handleDragOver)
    document.body.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount () {
    document.body.removeEventListener('dragover', this.handleDragOver)
    document.body.removeEventListener('drop', this.handleDrop)
  }

  handleDragLeave (event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.endDragOver()
  }

  handleDragOver (event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.startDragOver()
    event.dataTransfer.dropEffect = 'copy'
  }

  handleDrop (event) {
    event.stopPropagation()
    event.preventDefault()
    this.props.endDragOver()
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files
    for (let i = 0; i < files.length; i++) {
      this.props.uploadFile(files[ i ])
    }
  }

  handleClick () {
    this.fileInput.value = null
    this.fileInput.click()
  }

  render () {
    return (
      <div>
        <div onClick={this.handleClick} className="ui icon message">
          <i className="cloud upload icon" />
          <div className="content">
            <div className="header">
              Click here to select files to upload
            </div>
            <p>Or simply drag them to the browser window</p>
          </div>
        </div>
        <input ref={(element) => { this.fileInput = element }} onChange={this.handleDrop} type="file"
               style={{display: 'none'}} multiple />
        {this.props.dragOver ? <div onDragLeave={this.handleDragLeave} className="dragOver">
          <div className="dragOverContent">+</div>
        </div> : null}
      </div>
    )
  }
}

Dropzone.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  startDragOver: PropTypes.func.isRequired,
  endDragOver: PropTypes.func.isRequired,
  dragOver: PropTypes.bool.isRequired
}

export default Dropzone
