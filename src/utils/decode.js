import { decodeDeck } from 'node-artifact-api';
import _ from 'lodash';

const decode = code => {
    const extract = code.replace('https://playartifact.com/d/', '');
    const rawDeck = decodeDeck(extract);
    if (isInvalid(rawDeck)) {
        return false;
    }
    return rawDeck;
};

export default decode;

const isInvalid = ({ cards, heroes, name }) =>
    name === 'Invalid Code' && _.isEmpty(cards) && _.isEmpty(heroes);
