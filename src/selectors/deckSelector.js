import { createSelector } from 'reselect';
import _ from 'lodash';

import language from './languageSelector';
import sort from '../utils/sort';

const cardByKey = state => _.keyBy(state.cardsets.cards, c => c.card_id);
const id = state => state.decks.current_deck.id;
const name = state => state.decks.current_deck.name;
const old_cards = state => state.decks.current_deck.cards;
const old_heroes = state => state.decks.current_deck.heroes;

const heroes = createSelector(
    cardByKey,
    old_heroes,
    (cardByKey, old_heroes) =>
        old_heroes.map(h => {
            if (!h.id) {
                return h;
            }
            return { ...h, ...cardByKey[h.id] };
        })
);

const signatures = createSelector(
    heroes,
    heroes =>
        heroes
            .filter(h => h.id)
            .map(h => {
                const includes = _.find(h.references, r => r.ref_type === 'includes');
                const { card_id, count } = includes;
                return { id: card_id, count };
            })
);

const cards = createSelector(
    cardByKey,
    old_cards,
    heroes,
    signatures,
    (cardByKey, old_cards, heroes, signatures) =>
        sort(old_cards.concat(signatures).map(c => ({ ...c, ..._.omit(cardByKey[c.id], 'count') })))
);

const deckSelector = createSelector(
    id,
    name,
    heroes,
    cards,
    language,
    (id, name, heroes, cards, language) => ({
        current_deck: {
            id,
            name,
            heroes,
            cards
        },
        language
    })
);

export default deckSelector;
