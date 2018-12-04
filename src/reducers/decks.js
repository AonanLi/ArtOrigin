import _ from 'lodash';
import storage from 'redux-persist/lib/storage';

import default_decks from '../data/default_decks';

const reducers = {
    SAVE_DECK: saveDeck,
    ACTIVE_DECK: activeDeck,
    REMOVE_DECK: removeDeck,
    RESET_DECK: resetDeck,
    MANAGE_DECK_CARDS: manageDeckCards
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

const defaultState = { decks: default_decks, current_deck: default_deck };

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

function manageDeckCards(state, { card, step }) {
    const { current_deck } = state;
    const { heroes, cards } = current_deck;
    const { card_type, card_id } = card;
    const isHero = card_type === 'Hero';

    if (isHero) {
        const newHeroes = _.cloneDeep(heroes);
        if (step > 0) {
            const item = _.find(newHeroes, h => _.isUndefined(h.id));
            if (item) {
                item.id = card_id;
            }
        } else {
            _.find(newHeroes, h => h.id === card_id).id = undefined;
        }
        const newDeck = { ...current_deck, heroes: newHeroes };
        return { ...state, current_deck: newDeck };
    } else {
        let newCards = _.cloneDeep(cards);
        const item = _.find(newCards, c => c.id === card_id);
        if (step > 0) {
            if (item) {
                item.count++;
            } else {
                newCards.push({ id: card_id, count: 1 });
            }
        } else {
            if (item.count === 1) {
                _.pull(newCards, item);
            } else {
                item.count--;
            }
        }
        const newDeck = { ...current_deck, cards: newCards };
        return { ...state, current_deck: newDeck };
    }
}
