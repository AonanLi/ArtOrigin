import axios from 'axios';
import { getSet } from 'node-artifact-api';
import _ from 'lodash';

const cardsets = ['00', '01'];
const priceSteps = [0, 100, 200];

export const getCardSets = () =>
    Promise.all(cardsets.map(cs => getSet(cs).then(r => r.card_set.card_list)));

export const getPrices = () =>
    Promise.all(
        priceSteps.map(step =>
            axios({
                method: 'get',
                url: `https://steamcommunity.com/market/search/render/?appid=583950&norender=1&count=100&start=${step}`
            })
        )
    ).then(responses => {
        const all = _.flatten(
            responses.map(response => {
                const { success, results } = response.data;
                if (success) {
                    return results;
                } else {
                    return false;
                }
            })
        );

        const filtered = _.compact(
            all.map(r =>
                _.pick(r, ['hash_name', 'sell_listings', 'sell_price_text', 'sale_price_text'])
            )
        );
        return _.keyBy(filtered, f => f.hash_name.slice(1));
    });
