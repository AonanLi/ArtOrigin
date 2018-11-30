import uuid from 'uuid';

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
