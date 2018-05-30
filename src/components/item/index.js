import React, { Component } from 'react';
import './item.css';

class Item extends Component {
  render() {
    const { label, value, onClick, disabled } = this.props;
    const item = { label, value };

    return (
      <div className="item">
        <button onClick={() => onClick(item)} disabled={disabled}>
          <div className="item_label">{label}</div>
          <div className="item_value">${value.toFixed(2)}</div>
        </button>
      </div>
    );
  }
}

export default Item;
