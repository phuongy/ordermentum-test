import React, { Component } from 'react';
import './coin.css';

class Coin extends Component {
  render() {
    const { className, onClick, label, value } = this.props;
    const coin = { label, value };

    return (
      <button
        className={`coin ${className ? className : ''}`}
        onClick={() => onClick(coin)}>
        {label}
      </button>
    );
  }
}

export default Coin;
