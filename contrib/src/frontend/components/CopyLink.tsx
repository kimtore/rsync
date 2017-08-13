import React from 'react';
import autobind from 'autobind-decorator';
import copy from 'copy-to-clipboard';

type Props = {
  url: string;
};

@autobind
class CopyLink extends React.Component<Props> {
  handleClick() {
    copy(this.props.url);
  }

  render() {
    return (
      <a className="copyToClipboard" onClick={this.handleClick}>
        Copy URL to clipboard
      </a>
    );
  }
}

export default CopyLink;
