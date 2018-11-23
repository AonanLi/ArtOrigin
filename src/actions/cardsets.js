import { getCardSets } from '../api/artifact';

export const saveCardsets = () => dispatch => {
    dispatch(setCardsetsLoading(true));
    getCardSets().then(cards => {
        dispatch({
            type: 'SAVE_CARDSETS',
            payload: cards
        });
        dispatch(setCardsetsLoading(false));
    });
};

export const setCardsetsLoading = loading => ({
    type: 'SET_CARDSETS_LOADING',
    payload: loading
});
