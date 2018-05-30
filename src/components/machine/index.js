import React, { Component } from 'react';
import Item from '../item';
import Coin from '../coin';

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
    const coinValue = getCoinValue();

    return (
      <div className="machine">
        <div className="machine_denominations">
          {denominations.map((d, index) => (
            <Coin
              key={`denomination-${index}`}
              onClick={insertNewCoin}
              label={d.label}
              value={d.value}
            />
          ))}
          <button onClick={() => cancelPurchase()}>Cancel</button>
        </div>
        <div className="machine_coinDisplay">
          {change !== undefined ? change : coinValue}
        </div>
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
      </div>
    );
  }
}

export default Machine;
