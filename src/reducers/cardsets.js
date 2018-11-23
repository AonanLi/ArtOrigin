import _ from 'lodash';

const reducers = {
    SAVE_CARDSETS: saveCardSets
};
const defaultState = { cards: undefined, refs: undefined, loading: false };

export default { reducers, defaultState };

function saveCardSets(state, payload) {
    const cards = _.flatten(payload)
        .filter(c => c.card_type !== 'Pathing' && c.card_type !== 'Stronghold')
        .map(c => ({ ...c, key: c.card_id.toString() }));
    const references = _.flatten(cards.map(c => c.references.map(r => r.card_id)));
    const partition = _.partition(
        cards,
        c => c.card_type !== 'Hero' && references.includes(c.card_id)
    );
    return {
        ...state,
        cards: partition[1],
        refs: _.keyBy(partition[0], c => c.card_id)
    };
}
