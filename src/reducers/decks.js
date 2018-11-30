import _ from 'lodash';

const reducers = {
    SAVE_DECK: saveDeck,
    ACTIVE_DECK: activeDeck,
    REMOVE_DECK: removeDeck,
    RESET_DECK: resetDeck
};

const default_deck = {
    id: 'default',
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

const defaultState = { decks: {}, current_deck: default_deck };

export default { reducers, defaultState };

function saveDeck(state, deck) {
    const { decks, current_deck } = state;
    return {
        ...state,
        decks: { ...decks, [deck.id]: deck },
        current_deck: current_deck.id === deck.id ? current_deck : deck
    };
}

function activeDeck(state, id) {
    return { ...state, current_deck: state.decks[id] };
}

function removeDeck(state, id) {
    return { ...state, decks: _.omit(state.decks, [id]) };
}

function resetDeck(state) {
    return { ...state, current_deck: default_deck };
}
