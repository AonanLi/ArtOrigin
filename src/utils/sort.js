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

import _ from 'lodash';

const sort = cards => {
    const heroParts = _.partition(cards, c => c.card_type === 'Hero');
    const itemParts = _.partition(heroParts[1], c => c.card_type === 'Item');
    const first = _.sortBy(heroParts[0], c => colorOrder(c));
    const second = _.sortBy(itemParts[1], c => c.mana_cost, c => colorOrder(c));
    const third = _.sortBy(itemParts[0], c => c.gold_cost);
    return _.flatten([first, second, third]);
};

export default sort;
