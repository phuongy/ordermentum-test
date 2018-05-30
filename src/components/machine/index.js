import React, { Component } from 'react';
import Item from '../item';
import Coin from '../coin';
import './machine.css';

class Machine extends Component {
  render() {
    const {
      denominations,
      items,
      change,
      selectedItem,
      selectItem,
      getCoinValue,
      insertNewCoin,
      cancelPurchase
    } = this.props;
    console.log(this.props);
    const coinValue = getCoinValue();

    return (
      <div className="machine">
        <button className="cancel" onClick={() => cancelPurchase()}>
          Cancel
        </button>
        <div className="machine_denominations">
          {denominations.map((d, index) => (
            <Coin
              key={`denomination-${index}`}
              onClick={insertNewCoin}
              label={d.label}
              value={d.value}
            />
          ))}
        </div>
        <div className="machine_coinDisplay">{coinValue}</div>
        <div className="machine_items">
          {items.map((item, index) => (
            <Item
              key={`item-${index}`}
              onClick={selectItem}
              disabled={selectedItem !== undefined}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
        <div className="machine_changeDrop">
          {change !== undefined ? `${change}` : '-'}
        </div>
        <div className="machine_itemDrop">
          {selectedItem !== undefined ? selectedItem.label : '-'}
        </div>
      </div>
    );
  }
}

export default Machine;
