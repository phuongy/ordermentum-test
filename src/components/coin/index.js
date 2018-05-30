import React, { Component } from 'react';

class Coin extends Component {
  render() {
    const { onClick, label, value } = this.props;
    const coin = { label, value };

    return (
      <button className="denomination" onClick={() => onClick(coin)}>
        {label}
      </button>
    );
  }
}

export default Coin;
