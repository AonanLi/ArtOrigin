import _ from 'lodash';

const reducers = {
    RESET_FILTER: resetFilter,
    SET_FILTER_VALUE: setFilterValue,
    SET_COLOR: setColor,
    SET_CARDTYPE: setCardType,
    SET_SUBTYPE: setSubType,
    SET_RARITY: setRarity
};

const defaultState = {
    color: [],
    rarity: [],
    card_type: [],
    sub_type: [],
    mana_cost: [0, 10],
    gold_cost: [0, 25],
    attack: [0, 20],
    armor: [0, 20],
    hit_points: [0, 20],
    keyword: ''
};

const {
    color,
    card_type,
    sub_type,
    mana_cost,
    gold_cost,
    attack,
    armor,
    hit_points
} = defaultState;

export default { reducers, defaultState };

function resetFilter() {
    return defaultState;
}

function setFilterValue(state, { path, value }) {
    return { ...state, [path]: value };
}

function setColor(state, value) {
    if (state.color.includes(value)) {
        return { ...state, color: _.pull(state.color, value) };
    }
    return {
        ...state,
        color: state.color.concat(value),
        sub_type,
        gold_cost
    };
}

function setCardType(state, value) {
    if (state.card_type.includes(value)) {
        if (state.card_type.length === 1) {
            return {
                ...state,
                card_type: _.pull(state.card_type, value),
                mana_cost,
                attack,
                armor,
                hit_points
            };
        }
        return {
            ...state,
            card_type: _.pull(state.card_type, value),
            attack,
            armor,
            hit_points
        };
    }
    if (value === 'Hero') {
        return {
            ...state,
            card_type: ['Hero'],
            sub_type,
            gold_cost
        };
    }
    return {
        ...state,
        card_type: _.pull(state.card_type, 'Hero').concat(value),
        sub_type,
        gold_cost,
        attack,
        armor,
        hit_points
    };
}

function setSubType(state, value) {
    if (state.sub_type.includes(value)) {
        if (state.sub_type.length === 1) {
            return { ...state, sub_type: _.pull(state.sub_type, value) };
        }
        return {
            ...state,
            sub_type: _.pull(state.sub_type, value),
            gold_cost
        };
    }
    return {
        ...state,
        sub_type: state.sub_type.concat(value),
        color,
        card_type,
        mana_cost,
        attack,
        armor,
        hit_points
    };
}

function setRarity(state, value) {
    if (state.rarity.includes(value)) {
        return { ...state, rarity: _.pull(state.rarity, value) };
    }
    return { ...state, rarity: state.rarity.concat(value) };
}
