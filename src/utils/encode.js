import { encodeDeck } from 'node-artifact-api';
import _ from 'lodash';

const encode = current_deck => {
    const { heroes, cards, name } = current_deck;
    const rawDeck = {
        heroes: heroes.map(h => _.pick(h, ['id', 'turn'])),
        cards: cards.filter(c => !c.isSig).map(c => _.pick(c, ['id', 'count'])),
        name
    };
    const code = encodeDeck(rawDeck);
    if (code !== 'Invalid deck object') {
        return code;
    }
    return false;
};

export default encode;
