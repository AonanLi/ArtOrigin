import { combineReducers } from 'redux';
import _ from 'lodash';

import cardsets from './cardsets';

const paths = {
    cardsets
};

const rootReducer = combineReducers(_.mapValues(paths, path => getReducer(path)));

export default rootReducer;

export const defaultState = _.merge.apply(
    _,
    [{}].concat(_.mapValues(paths, path => _.get(path, 'reducers.defaultState')))
);

function getReducer(config) {
    const { defaultState, reducers } = config;
    return (state = defaultState, action) => {
        var reducer = reducers[action.type];
        if (reducer) {
            return reducer(state, action.payload);
        }
        return state;
    };
}
