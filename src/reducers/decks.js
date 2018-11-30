import _ from 'lodash';

const reducers = {
    SAVE_DECK: saveDeck,
    ACTIVE_DECK: activeDeck,
    REMOVE_DECK: removeDeck
};

const default_deck = {
    heroes: [undefined, undefined, undefined, undefined, undefined],
    cards: [],
    name: 'Unnamed Deck'
};

const defaultState = { decks: {}, current_deck: { id: undefined, deck: default_deck } };

export default { reducers, defaultState };

function saveDeck(state, { id, deck }) {
    return { ...state, decks: { ...state.decks, [id]: deck } };
}

function activeDeck(state, id) {
    return { ...state, current_deck: { id, deck: state.decks[id] } };
}

function removeDeck(state, id) {
    return { ...state, decks: _.omit(state.decks, [id]) };
}
