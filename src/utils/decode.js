import { decodeDeck } from 'node-artifact-api';
import _ from 'lodash';

const encode = code => {
    const extract = code.replace('https://playartifact.com/d/', '');
    const rawDeck = decodeDeck(extract);
    if (isInvalid(rawDeck)) {
        return false;
    }
    return rawDeck;
};

export default encode;

const isInvalid = ({ cards, heroes, name }) =>
    name === 'Invalid Code' && _.isEmpty(cards) && _.isEmpty(heroes);
