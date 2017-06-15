import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import { observer } from 'mobx-react'

@observer
@autobind
class DropZone extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isDraggingOver: false
    }
  }

  componentWillMount() {
    document.body.addEventListener('dragover', this.handleDragOver)
    document.body.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    document.body.removeEventListener('dragover', this.handleDragOver)
    document.body.removeEventListener('drop', this.handleDrop)
  }

  handleDragLeave(event) {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ isDraggingOver: false })
  }

  handleDragOver(event) {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ isDraggingOver: true })
    event.dataTransfer.dropEffect = 'copy'
  }

  handleDrop(event) {
    event.stopPropagation()
    event.preventDefault()
    this.setState({ isDraggingOver: false })
    const files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files
    for (let i = 0; i < files.length; i++) {
      this.props.uploadFile(files[i])
    }
  }

  handleClick() {
    this.fileInput.value = null
    this.fileInput.click()
  }

  render() {
    return (
      <div>
        <div
          onClick={this.handleClick}
          className="ui icon message upload-header"
        >
          <i className="cloud upload icon" />
          <div className="content">
            <div className="header">Click here to select files to upload</div>
            <p>Or simply drag them to the browser window</p>
          </div>
        </div>
        <input
          ref={element => {
            this.fileInput = element
          }}
          onChange={this.handleDrop}
          type="file"
          style={{ display: 'none' }}
          multiple
        />
        {this.state.isDraggingOver
          ? <div onDragLeave={this.handleDragLeave} className="dragOver">
              <div className="dragOverContent">+</div>
            </div>
          : null}
      </div>
    )
  }
}

DropZone.propTypes = {
  uploadFile: PropTypes.func.isRequired
}

export default DropZone
