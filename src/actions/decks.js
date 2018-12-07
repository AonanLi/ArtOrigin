import uuid from 'uuid';

export const addDeck = rawDeck => dispatch => {
    const id = uuid.v4();
    dispatch(saveDeck({ ...rawDeck, id }));
    dispatch(activeDeck(id));
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

export const resetDeck = () => ({
    type: 'RESET_DECK'
});

export const saveCurrentDeck = () => (dispatch, getState) => {
    const { current_deck } = getState().decks;
    dispatch(saveDeck({ ...current_deck, id: uuid.v4() }));
};

export const manageDeckCards = (card, step) => ({
    type: 'MANAGE_DECK_CARDS',
    payload: { card, step }
});

export const swapHeroes = (from, to) => ({
    type: 'SWAP_HEROES',
    payload: { from, to }
});
