import uuid from 'uuid';
import { decodeDeck } from 'node-artifact-api';

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
    const extract = code.replace('https://playartifact.com/d/', '');
    const rawDeck = decodeDeck(extract);
    dispatch(addDeck(rawDeck));
};

export const resetDeck = () => ({
    type: 'RESET_DECK'
});
