import _ from 'lodash';

const reducers = {
    SAVE_CARDSETS: saveCardSets
};
const defaultState = { cards: undefined, refs: undefined, loading: false };

export default { reducers, defaultState };

function saveCardSets(state, payload) {
    const cards = _
        .flatten(payload)
        .filter(c => c.card_type !== 'Pathing' && c.card_type !== 'Stronghold');
    const references = _.flatten(cards.map(c => c.references.map(r => r.card_id)));
    const marked = cards.map(c => ({
        ...c,
        isSig: c.card_type !== 'Hero' && references.includes(c.card_id)
    }));
    return {
        ...state,
        cards: marked,
        refs: _.keyBy(marked.filter(m => m.isSig), c => c.card_id)
    };
}
