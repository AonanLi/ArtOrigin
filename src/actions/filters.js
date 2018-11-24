export const resetFilter = () => ({
    type: 'RESET_FILTER'
});

export const setFilterValue = (path, value) => ({
    type: 'SET_FILTER_VALUE',
    payload: { path, value }
});

export const setFilterRange = (path, index, value) => ({
    type: 'SET_FILTER_RANGE',
    payload: { path, index, value }
});
