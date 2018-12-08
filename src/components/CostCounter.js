import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';

import ColorBar from './ColorBar';

import { costWidth } from '../utils/dimensions';

const CostCounter = ({ item, max }) => (
    <View style={{ width: costWidth, height: 88 }}>
        <View
            style={{
                backgroundColor: '#150f19',
                height: 64,
                justifyContent: 'flex-end',
                borderWidth: 1,
                borderColor: '#150f19'
            }}
        >
            <ColorBar cards={item.records} max={max} />
        </View>
        <View style={{ backgroundColor: '#150f19', height: 18, marginTop: 6 }}>
            <Text style={{ textAlign: 'center', fontSize: 12 }}>
                {item.cost === 8 ? '8+' : item.cost}
            </Text>
        </View>
    </View>
);

export default CostCounter;
