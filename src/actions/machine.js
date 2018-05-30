export const denominations = [
  { label: '10c', value: 0.1, className: 'tenCents' },
  { label: '20c', value: 0.2, className: 'twentyCents' },
  { label: '50c', value: 0.5, className: 'fiftyCents' },
  { label: '$1', value: 1, className: 'oneDollar' },
  { label: '$2', value: 2, className: 'twoDollars' }
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
  const change = getCoinValue(state);

  return {
    ...state,
    coins: [],
    change,
    selectedItem: undefined
  };
};

export const resetPurchase = state => {
  return {
    ...state,
    coins: [],
    change: undefined,
    selectedItem: undefined
  };
};

export const insertNewCoin = (state, coin) => {
  if (denominations.filter(d => d.value === coin.value).length > 0) {
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

  if (coinValue >= itemValue) {
    const change = (coinValue - itemValue).toFixed(2);

    return {
      ...state,
      selectedItem: item,
      coins: [],
      change
    };
  }

  return state;
};
