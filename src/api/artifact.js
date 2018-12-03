import { getSet } from 'node-artifact-api';

const cardsets = ['00', '01'];

export const getCardSets = () =>
    Promise.all(cardsets.map(cs => getSet(cs).then(r => r.card_set.card_list)));
