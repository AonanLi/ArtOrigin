import { createSelector } from 'reselect';
import _ from 'lodash';

import language from './languageSelector';
import defaultGet from '../utils/defaultGet';

const cards = state => state.cardsets.cards.filter(c => !c.isRef);
const filters = state => state.filters;

const filterSelector = createSelector(
    cards,
    filters,
    language,
    (cards, filters, language) => {
        const { color, rarity, card_type, sub_type, keyword } = filters;

        const colorEx = allSelected(color) ? c => c : c => _.find(color, co => c[co]);
        const rarityEx = allSelected(rarity)
            ? c => c
            : c => _.find(rarity, r => (r === 'Basic' && !c.rarity) || r === c.rarity);
        const cardTypeEx = allSelected(card_type) ? c => c : c => card_type.includes(c.card_type);
        const subTypeEx =
            sub_type.length === 0
                ? c => c
                : c => {
                      if (c.sub_type === 'Deed') {
                          return sub_type.includes('Consumable');
                      }
                      return sub_type.includes(c.sub_type);
                  };
        const manaEx = rangeEx('mana_cost', filters);
        const goldEx = rangeEx('gold_cost', filters);
        const attackEx = heroRangeEx('attack', filters);
        const armorEx = heroRangeEx('armor', filters);
        const hpEx = heroRangeEx('hit_points', filters);
        const keywordEx = c =>
            defaultGet(c.card_name, language, 'english')
                .concat(defaultGet(c.card_name, 'english', 'english'))
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
    }
);

export default filterSelector;

const allSelected = array => array.length === 0 || array.length === 4;

const rangeEx = (path, filters) => c =>
    _.isUndefined(c[path]) || (c[path] >= filters[path][0] && c[path] <= filters[path][1]);

const heroRangeEx = (path, filters) => c =>
    c.card_type !== 'Hero' ||
    ((c[path] || 0) >= filters[path][0] && (c[path] || 0) <= filters[path][1]);
