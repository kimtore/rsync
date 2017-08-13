import React from 'react';
import autobind from 'autobind-decorator';
import { observer } from 'mobx-react';

type Props = {
  uploadFile: Function;
};

type State = {
  isDraggingOver: boolean;
};

@observer
@autobind
class DropZone extends React.Component<Props, State> {
  fileInput: HTMLInputElement | null;
  constructor(...args: any[]) {
    super(...args);
    this.state = {
      isDraggingOver: false,
    };
  }

  refs: {
    fileInput: HTMLInputElement;
  };

  componentWillMount() {
    document.body.addEventListener('dragover', this.handleDragOver);
    document.body.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    document.body.removeEventListener('dragover', this.handleDragOver);
    document.body.removeEventListener('drop', this.handleDrop);
  }

  handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isDraggingOver: false });
  }

  handleDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isDraggingOver: true });
    event.dataTransfer.dropEffect = 'copy';
  }

  handleDrop(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isDraggingOver: false });
    const files: FileList = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      this.props.uploadFile(files[i]);
    }
  }

  handleSelect(event: React.ChangeEvent<HTMLInputElement>): void {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ isDraggingOver: false });
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.props.uploadFile(files[i]);
      }
    }
  }

  handleClick() {
    if (this.fileInput) {
      this.fileInput.value = '';
      this.fileInput.click();
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick} className="ui icon message upload-header">
          <i className="cloud upload icon" />
          <div className="content">
            <div className="header">Click here to select files to upload</div>
            <p>Or simply drag them to the browser window</p>
          </div>
        </div>
        <input
          ref={element => {
            this.fileInput = element;
          }}
          onChange={this.handleSelect}
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
    );
  }
}

export default DropZone;
