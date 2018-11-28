import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';

import Divider from './Divider';
import AlertText from './AlertText';

import ui from '../data/ui';
import { card_types, sub_types } from '../data/types';

const TypeCounter = ({ item, cards }) => {
    const types = item ? sub_types : card_types.filter(c => c.label !== 'Hero');
    const path = item ? 'sub_type' : 'card_type';
    const condition = cards.length < (item ? 10 : 40);
    const name = `${cards.length} ${item ? 'ITEMS' : 'CARDS'}`;
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
                {types.map((type, i) => (
                    <View key={i}>
                        <Image
                            source={type.icon}
                            style={{
                                height: 24,
                                width: 24,
                                marginTop: 4
                            }}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 12 }}>
                            {cards.filter(c => c[path] === type.label).length}
                        </Text>
                    </View>
                ))}
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
