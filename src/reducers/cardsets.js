import _ from 'lodash';

import sort from '../utils/sort';

const reducers = {
    SAVE_CARDSETS: saveCardSets
};
const defaultState = { cards: undefined, refs: undefined, loading: false };

export default { reducers, defaultState };

function saveCardSets(state, payload) {
    const cards = _.flatten(payload).filter(
        c => c.card_type !== 'Pathing' && c.card_type !== 'Stronghold' && c.card_type !== 'Mutation'
    );
    const references = _.flatten(cards.map(c => c.references.map(r => r.card_id)));
    const signatures = _.flatten(
        cards.map(c =>
            c.references
                .filter(r => r.ref_type === 'includes')
                .map(r => ({ id: r.card_id, hero: c.ingame_image.default }))
        )
    );
    const sorted = sort(cards);
    const marked = sorted.map(c => {
        const isSig = _.find(signatures, s => s.id === c.card_id);
        return {
            ...c,
            isRef: c.card_type !== 'Hero' && references.includes(c.card_id),
            isSig: isSig ? isSig.hero : false
        };
    });
    return {
        ...state,
        cards: marked,
        refs: _.keyBy(marked.filter(m => m.isRef), c => c.card_id)
    };
}
