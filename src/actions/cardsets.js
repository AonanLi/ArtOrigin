import { getCardSets } from '../api/artifact';

export const saveCardsets = () => dispatch => {
    dispatch(setCardsetsLoading(true));
    getCardSets().then(sets => {
        dispatch({
            type: 'SAVE_CARDSETS',
            payload: sets
        });
        dispatch(setCardsetsLoading(false));
    });
};

export const setCardsetsLoading = loading => ({
    type: 'SET_CARDSETS_LOADING',
    payload: loading
});
