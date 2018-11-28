import { createSelector } from 'reselect';
import _ from 'lodash';

import defaultGet from '../../utils/defaultGet';

const cards = state => state.cardsets.cards;
const filters = state => state.filters;
const language = state => state.settings.language;

const filter = createSelector(cards, filters, language, (cards, filters, language) => {
    const { color, rarity, card_type, sub_type, keyword } = filters;

    const colorEx = allSelected(color) ? c => c : c => _.find(color, co => c[co]);
    const rarityEx = allSelected(rarity)
        ? c => c
        : c => _.find(rarity, r => (r === 'Basic' && !c.rarity) || r === c.rarity);
    const cardTypeEx = allSelected(card_type)
        ? c => c
        : c => _.find(card_type, t => c.card_type === t);
    const subTypeEx = sub_type.length === 0 ? c => c : c => _.find(sub_type, t => c.sub_type === t);
    const manaEx = rangeEx('mana_cost', filters);
    const goldEx = rangeEx('gold_cost', filters);
    const attackEx = heroRangeEx('attack', filters);
    const armorEx = heroRangeEx('armor', filters);
    const hpEx = heroRangeEx('hit_points', filters);
    const keywordEx = c =>
        defaultGet(c.card_name, language, 'english', false, true)
            .toLowerCase()
            .includes(keyword.toLowerCase());

    return cards.filter(
        c =>
            colorEx(c) &&
            rarityEx(c) &&
            cardTypeEx(c) &&
            subTypeEx(c) &&
            manaEx(c) &&
            goldEx(c) &&
            attackEx(c) &&
            armorEx(c) &&
            hpEx(c) &&
            keywordEx(c)
    );
});

const sort = createSelector(filter, cards => {
    const heroParts = _.partition(cards, c => c.card_type === 'Hero');
    const itemParts = _.partition(heroParts[1], c => c.card_type === 'Item');
    const first = _.sortBy(heroParts[0], c => colorOrder(c));
    const second = _.sortBy(itemParts[1], c => colorOrder(c), c => c.mana_cost);
    const third = _.sortBy(itemParts[0], c => c.gold_cost);
    return _.flatten([first, second, third]);
});

const cardsSelector = createSelector(sort, language, (cards, language) => ({
    cards,
    language,
    deck: {
        //test data for now
        heroes: cards
            .filter(c => c.card_type === 'Hero')
            .concat([undefined, undefined, undefined, undefined, undefined])
            .slice(0, 5),
        cards: cards.filter(c => c.card_type !== 'Hero').slice(20, 61),
        name: 'Green/Black Example'
    }
}));

export default cardsSelector;

const allSelected = array => array.length === 0 || array.length === 4;

const rangeEx = (path, filters) => c =>
    _.isUndefined(c[path]) || (c[path] >= filters[path][0] && c[path] <= filters[path][1]);

const heroRangeEx = (path, filters) => c =>
    c.card_type !== 'Hero' ||
    ((c[path] || 0) >= filters[path][0] && (c[path] || 0) <= filters[path][1]);

const colorOrder = ({ is_red, is_green, is_blue, is_black }) => {
    if (is_red) {
        return 0;
    }
    if (is_green) {
        return 1;
    }
    if (is_blue) {
        return 2;
    }
    if (is_black) {
        return 3;
    }
};
