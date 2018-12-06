import { createSelector } from 'reselect';
import _ from 'lodash';

import language from './languageSelector';
import filter from './filterSelector';

const heroes = state => state.decks.current_deck.heroes.filter(h => h.id);
const cards = state => state.decks.current_deck.cards;
const showDetails = state => state.cardsets.showDetails;

const counts = createSelector(
    filter,
    heroes,
    cards,
    (filter, heroes, cards) => {
        const keyByHeroes = _.keyBy(heroes, h => h.id);
        const keyByCards = _.keyBy(cards, c => c.id);
        return filter.map(c => {
            const isHero = c.card_type === 'Hero';
            if (isHero) {
                if (keyByHeroes[c.card_id]) {
                    return { ...c, count: 1 };
                }
                return { ...c, count: 0 };
            } else {
                const found = keyByCards[c.card_id];
                if (found) {
                    return { ...c, count: found.count };
                }
                return { ...c, count: 0 };
            }
        });
    }
);

const cardsSelector = createSelector(
    counts,
    heroes,
    language,
    showDetails,
    (cards, heroes, language, showDetails) => ({
        cards,
        language,
        has5Heroes: heroes.length === 5,
        showDetails
    })
);

export default cardsSelector;
