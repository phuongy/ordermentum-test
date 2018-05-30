import React, { Component } from 'react';
import Machine from './components/machine';
import './App.css';

import {
  denominations,
  items,
  getCoinValue,
  insertNewCoin,
  cancelPurchase,
  resetPurchase,
  selectItem
} from './actions/machine';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      change: undefined,
      selectedItem: undefined
    };
  }

  getCoinValue = () => getCoinValue(this.state);

  insertNewCoin = coin => {
    this.setState(insertNewCoin(this.state, coin));
  };

  cancelPurchase = () => {
    this.setState(cancelPurchase(this.state), async () => {
      this.setState(await resetPurchase(this.statestate));
    });
  };

  selectItem = item => {
    this.setState(selectItem(this.state, item), async () => {
      this.setState(await resetPurchase(this.state));
    });
  };

  render() {
    const { change, selectedItem, coins } = this.state;

    return (
      <Machine
        change={change}
        selectedItem={selectedItem}
        coins={coins}
        items={items}
        denominations={denominations}
        getCoinValue={this.getCoinValue}
        insertNewCoin={this.insertNewCoin}
        cancelPurchase={this.cancelPurchase}
        selectItem={this.selectItem}
      />
    );
  }
}

export default App;
