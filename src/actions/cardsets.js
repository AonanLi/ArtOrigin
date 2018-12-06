import { getCardSets, getPrices } from '../api/artifact';

export const saveCardsets = () => dispatch => {
    dispatch(setCardsetsLoading(true));
    getCardSets()
        .then(cards => {
            dispatch({
                type: 'SAVE_CARDSETS',
                payload: cards
            });
            dispatch(updateCardsPrice());
            dispatch(setCardsetsLoading(false));
        })
        .catch(e => dispatch(setCardsetsLoading(false)));
};

export const setCardsetsLoading = loading => ({
    type: 'SET_CARDSETS_LOADING',
    payload: loading
});

export const updateCardsPrice = () => dispatch => {
    return getPrices()
        .then(price => {
            if (price) {
                dispatch({
                    type: 'UPDATE_CARDS_PRICE',
                    payload: price
                });
            }
        })
        .catch(e => console.log(e)); // TODO: Error handling
};

export const setCardDetails = showDetails => ({
    type: 'SET_CARD_DETAILS',
    payload: showDetails
});
