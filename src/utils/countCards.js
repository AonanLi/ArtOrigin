import _ from 'lodash';

const countCards = cards => _.sumBy(cards, c => c.count);

export default countCards;
