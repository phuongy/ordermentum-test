import React, { Component } from 'react';
import './coin.css';

class Coin extends Component {
  render() {
    const { onClick, label, value } = this.props;
    const coin = { label, value };

    return (
      <button className="coin" onClick={() => onClick(coin)}>
        {label}
      </button>
    );
  }
}

export default Coin;
