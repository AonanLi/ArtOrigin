import uuid from 'uuid';

import decoder from '../utils/decoder';

export const addDeck = deck => ({
    type: 'SAVE_DECK',
    payload: { id: uuid.v4(), deck }
});

export const saveDeck = (id, deck) => ({
    type: 'SAVE_DECK',
    payload: { id, deck }
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
    const deck = decoder.ParseDeck(code);
    dispatch(addDeck(deck));
};
