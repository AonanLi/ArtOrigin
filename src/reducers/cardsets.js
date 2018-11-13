import _ from 'lodash';

const reducers = {
    SAVE_CARDSETS: saveCardSets
};
const defaultState = { sets: undefined, loading: false };

export default { reducers, defaultState };

function saveCardSets(state, payload) {
    return { ...state, sets: payload };
}
