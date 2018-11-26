export const resetFilter = () => ({
    type: 'RESET_FILTER'
});

export const setFilterValue = (path, value) => ({
    type: 'SET_FILTER_VALUE',
    payload: { path, value }
});

export const setColor = value => ({
    type: 'SET_COLOR',
    payload: value
});

export const setCardType = value => ({
    type: 'SET_CARDTYPE',
    payload: value
});

export const setSubType = value => ({
    type: 'SET_SUBTYPE',
    payload: value
});

export const setRarity = value => ({
    type: 'SET_RARITY',
    payload: value
});
