import { AsyncStorage } from 'react-native';
import axios from 'axios';
import _ from 'lodash';

const cardsets = ['00', '01'];

export const getCardSets = () =>
    Promise.all(
        cardsets.map(cs =>
            axios({
                method: 'get',
                url: `https://playartifact.com/cardset/${cs}`
            }).then(response => {
                const { cdn_root, url } = response.data;
                return axios({
                    method: 'get',
                    url: `${cdn_root}${url}`
                }).then(set => set.data.card_set.card_list);
            })
        )
    ).catch(err => console.log(err));
