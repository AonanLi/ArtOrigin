import _ from 'lodash';

const reducers = {
    RESET_FILTER: resetFilter,
    SET_FILTER_VALUE: setFilterValue,
    SET_FILTER_RANGE: setFilterRange
};
const defaultState = {
    color: [],
    rarity: [],
    card_type: [],
    sub_type: [],
    mana_cost: { min: 0, max: 10 },
    gold_cost: { min: 0, max: 25 },
    attack: { min: 0, max: 20 },
    armor: { min: 0, max: 20 },
    hit_points: { min: 0, max: 20 },
    keyword: ''
};

export default { reducers, defaultState };

function resetFilter() {
    return defaultState;
}

function setFilterValue(state, { path, value }) {
    return { ...state, [path]: value };
}

function setFilterRange(state, { path, index, value }) {
    return { ...state, [path]: { ...state[path], [index]: value } };
}
