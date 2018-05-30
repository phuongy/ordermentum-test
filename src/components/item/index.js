import React, { Component } from 'react';

class Item extends Component {
  render() {
    const { label, value, onClick, disabled } = this.props;
    const item = { label, value };

    return (
      <div className="item">
        <button onClick={() => onClick(item)} disabled={disabled}>
          {label} - ${value}
        </button>
      </div>
    );
  }
}

export default Item;
