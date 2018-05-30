/* eslint-env jest */

import {
  denominations,
  items,
  getCoinValue,
  insertNewCoin,
  cancelPurchase,
  returnChange,
  resetPurchase,
  selectItem
} from '../machine';

const state = {
  coins: [],
  change: undefined,
  selectedItem: undefined
};

const tenCent = denominations[0];
const fiftyCents = denominations[2];
const oneDollar = denominations[3];
const twoDollar = denominations[4];

describe('get coin value', () => {
  it('add 10c coin', () => {
    const newState = insertNewCoin(state, tenCent);
    expect(newState.coins).toEqual([tenCent]);
    expect(getCoinValue(newState)).toEqual('0.10');
  });
  it('add 2x10c coin', () => {
    let newState = insertNewCoin(state, tenCent);
    newState = insertNewCoin(newState, tenCent);
    expect(newState.coins).toEqual([tenCent, tenCent]);
    expect(getCoinValue(newState)).toEqual('0.20');
  });
  it('add 2x$1 coin', () => {
    let newState = insertNewCoin(state, oneDollar);
    newState = insertNewCoin(newState, oneDollar);
    expect(newState.coins).toEqual([oneDollar, oneDollar]);
    expect(getCoinValue(newState)).toEqual('2.00');
  });
  it('add 1x$1 and 2x$2 coin', () => {
    let newState = insertNewCoin(state, oneDollar);
    newState = insertNewCoin(newState, twoDollar);
    newState = insertNewCoin(newState, twoDollar);
    expect(newState.coins).toEqual([oneDollar, twoDollar, twoDollar]);
    expect(getCoinValue(newState)).toEqual('5.00');
  });
  it('add invalid coin', () => {
    let newState = insertNewCoin(state, { label: 'invalid', value: 0 });
    expect(newState.coins).toEqual([]);
    expect(getCoinValue(newState)).toEqual('0.00');
  });
});

describe('select item', () => {
  it('amount > item price', () => {
    let newState = insertNewCoin(state, oneDollar);
    newState = insertNewCoin(newState, twoDollar);
    newState = insertNewCoin(newState, twoDollar);

    expect(getCoinValue(newState)).toEqual('5.00');
    newState = selectItem(newState, items[0]);

    expect(newState.selectedItem).toEqual(items[0]);
    expect(getCoinValue(newState)).toEqual('0.00');
    expect(newState.change).toEqual('2.50');
  });
  it('amount = item price', () => {
    let newState = insertNewCoin(state, fiftyCents);
    newState = insertNewCoin(newState, twoDollar);

    expect(getCoinValue(newState)).toEqual('2.50');
    newState = selectItem(newState, items[0]);

    expect(newState.selectedItem).toEqual(items[0]);
    expect(getCoinValue(newState)).toEqual('0.00');
    expect(newState.change).toEqual('0.00');
  });
  it('amount < item price', () => {
    let newState = insertNewCoin(state, oneDollar);

    expect(getCoinValue(newState)).toEqual('1.00');
    newState = selectItem(newState, items[0]);

    expect(newState.selectedItem).toEqual(undefined);
    expect(getCoinValue(newState)).toEqual('1.00');
    expect(newState.change).toEqual(undefined);
  });
});
