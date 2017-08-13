import React from 'react';
import autobind from 'autobind-decorator';

type Props = {
  expiry: string;
};

type State = {
  expiryString: string;
};

@autobind
class TimeRemaining extends React.Component<Props, State> {
  interval: number;

  componentWillMount() {
    const { expiry } = this.props;
    this.setState({ expiryString: this.getExpiryString(expiry) });
  }

  componentDidMount() {
    const { expiry } = this.props;
    this.interval = setInterval(() => {
      const { expiryString } = this.state;
      const newExpiryString = this.getExpiryString(expiry);
      if (expiryString !== newExpiryString) {
        this.setState({ expiryString: newExpiryString });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getExpiryString(expiry: string) {
    const dateDiff = Number(new Date(`${expiry}Z`)) - Number(new Date());
    if (dateDiff <= 0) {
      return 'Expired';
    }
    const decimalHours = Math.abs(dateDiff) / 3.6e6;
    const days = Math.floor(decimalHours / 24);
    const hours = Math.floor(decimalHours);
    if (days > 7) {
      return new Date(`${expiry}Z`).toISOString().slice(0, 10);
    } else if (days > 2) {
      return `${days}d ${hours}h`;
    }
    const minutes = Math.floor((decimalHours - hours) * 60);
    if (minutes > 0 && hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      const seconds = Math.floor(((decimalHours - hours) * 60 - minutes) * 60);
      if (seconds > 0) {
        return `${seconds}s`;
      } else {
        return 'Expired';
      }
    }
  }

  render() {
    const { expiryString } = this.state;
    return (
      <span>
        {expiryString}
      </span>
    );
  }
}

export default TimeRemaining;
