export const CHANGE_RETURN_DELAY = 500;
export const ITEM_SELECTION_DELAY = 500;
export const COIN_INSERT_DELAY = 500;

export const denominations = [
  { label: '10c', value: 0.1 },
  { label: '20c', value: 0.2 },
  { label: '50c', value: 0.5 },
  { label: '$1', value: 1 },
  { label: '$2', value: 2 }
]; // mocked value that would probably come from an api endpoint

export const items = [
  { label: 'Caramel', value: 2.5 },
  { label: 'Hazelnut', value: 3.1 },
  { label: 'Organic Raw', value: 2 }
]; // mocked value that would probably come from an api endpoint

export const getCoinValue = state => {
  return Array.isArray(state.coins)
    ? state.coins
        .reduce((acc, curr) => {
          return acc + curr.value;
        }, 0)
        .toFixed(2)
    : 0;
};

export const cancelPurchase = state => {
  console.log('purchase cancelled 1');
  return resetPurchase(state);
};

export const resetPurchase = state => {
  setTimeout(() => {
    return {
      ...state,
      coins: [],
      change: undefined,
      selectedItem: undefined
    };
  }, 1000); // fake delay to return coins
};

export const insertNewCoin = (state, coin) => {
  if (denominations.filter(d => d.value === coin.value)) {
    return {
      ...state,
      coins: [...state.coins, coin]
    };
  }

  return state;
};

export const selectItem = (state, item) => {
  if (state.selectedItem !== undefined) return state;

  const coinValue = parseFloat(getCoinValue(state));
  const itemValue = item.value;

  if (coinValue < itemValue) {
    console.error('Please insert more coins to purchase this item.');
  }

  if (coinValue >= itemValue) {
    const change = (coinValue - itemValue).toFixed(2);
    console.log(`Purchase successful, return change - ${change}`);

    return {
      ...state,
      selectedItem: item,
      change
    };
  }

  return state;
};

export const returnChange = state => {
  return resetPurchase(state);
};
