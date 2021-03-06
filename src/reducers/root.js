import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import _ from 'lodash';

import cardsets from './cardsets';
import settings from './settings';
import filters from './filters';
import decks from './decks';

const paths = {
    cardsets,
    settings,
    filters,
    decks
};

const rootReducer = combineReducers(_.mapValues(paths, path => getReducer(path)));

export default rootReducer;

export const defaultState = _.merge.apply(
    _,
    [{}].concat(_.mapValues(paths, path => _.get(path, 'reducers.defaultState')))
);

function getReducer(config) {
    const { defaultState, reducers, persistConfig } = config;
    const result = (state = defaultState, action) => {
        var reducer = reducers[action.type];
        if (reducer) {
            return reducer(state, action.payload);
        }
        return state;
    };
    if (persistConfig) {
        return persistReducer(persistConfig, result);
    }
    return result;
}
