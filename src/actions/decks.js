import uuid from 'uuid';

import decoder from '../utils/decoder';

export const addDeck = rawDeck => dispatch => {
    dispatch(saveDeck({ ...rawDeck, id: uuid.v4() }));
};

export const saveDeck = deck => ({
    type: 'SAVE_DECK',
    payload: deck
});

export const activeDeck = id => ({
    type: 'ACTIVE_DECK',
    payload: id
});

export const removeDeck = id => ({
    type: 'REMOVE_DECK',
    payload: id
});

export const addDeckFromCode = code => dispatch => {
    const rawDeck = decoder.ParseDeck(code);
    dispatch(addDeck(rawDeck));
};

export const resetDeck = () => ({
    type: 'RESET_DECK'
});
