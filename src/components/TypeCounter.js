import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import Divider from './Divider';
import AlertText from './AlertText';

import ui from '../data/ui';
import { card_types, sub_types } from '../data/types';
import countCards from '../utils/countCards';

const TypeCounter = ({ item, cards }) => {
    const types = item ? sub_types : card_types.filter(c => c.label !== 'Hero');
    const path = item ? 'sub_type' : 'card_type';
    const total_count = countCards(cards);
    const condition = total_count < (item ? 9 : 40);
    const name = item
        ? i18n.t('TotalCountItems', { total_count })
        : i18n.t('TotalCountCards', { total_count });
    return (
        <View>
            <AlertText condition={condition} text={name} />
            <Divider length={types.length * 40} horizontal />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <DoubleDivider />
                {types.map((type, i) => {
                    const type_count = countCards(cards.filter(c => c[path] === type.label));
                    return (
                        <View key={i}>
                            <Image
                                source={type.icon}
                                style={{
                                    height: 24,
                                    width: 24,
                                    marginTop: 4
                                }}
                            />
                            <Text style={{ textAlign: 'center', fontSize: 12 }}>{type_count}</Text>
                        </View>
                    );
                })}
                <DoubleDivider />
            </View>
        </View>
    );
};

export default TypeCounter;

const DoubleDivider = () => (
    <View style={{ flexDirection: 'row' }}>
        <Divider length={12} style={{ marginRight: 3 }} />
        <Divider length={12} />
    </View>
);
