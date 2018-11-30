import { createSelector } from 'reselect';

const current_deck = state => {
    return state.decks.current_deck;
};
const language = state => state.settings.language;

const deckSelector = createSelector(current_deck, language, (current_deck, language) => ({
    current_deck,
    language
}));

export default deckSelector;
