import _ from 'lodash';

const reducers = {
    SAVE_DECK: saveDeck,
    ACTIVE_DECK: activeDeck,
    REMOVE_DECK: removeDeck
};

const default_deck = {
    heroes: [
        { id: undefined, turn: 1 },
        { id: undefined, turn: 1 },
        { id: undefined, turn: 1 },
        { id: undefined, turn: 2 },
        { id: undefined, turn: 3 }
    ],
    cards: [],
    name: 'Unnamed Deck'
};

const defaultState = { decks: {}, current_deck: { id: undefined, deck: default_deck } };

export default { reducers, defaultState };

function saveDeck(state, { id, deck }) {
    const { decks, current_deck } = state;
    return {
        ...state,
        decks: { ...decks, [id]: deck },
        current_deck: current_deck.id === id ? current_deck : { id, deck }
    };
}

function activeDeck(state, id) {
    return { ...state, current_deck: { id, deck: state.decks[id] } };
}

function removeDeck(state, id) {
    return { ...state, decks: _.omit(state.decks, [id]) };
}
