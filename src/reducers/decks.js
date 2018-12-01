import _ from 'lodash';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
    key: 'decks',
    storage: storage,
    blacklist: ['current_deck']
};

export default { reducers, defaultState, persistConfig };

function saveDeck(state, deck) {
    return {
        ...state,
        decks: { ...state.decks, [deck.id]: deck }
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
