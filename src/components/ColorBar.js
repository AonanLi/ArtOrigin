import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { Text } from 'native-base';
import _ from 'lodash';

import { colors } from '../data/types';

const ColorBar = ({ cards, max }) =>
    colors.map(color => {
        const { icon, label, his } = color;
        const count = cards.filter(c => c[label]).length;
        if (count === 0) {
            return false;
        }
        if (_.isUndefined(max)) {
            return (
                <ImageBackground source={his} style={{ width: '100%' }} key={label}>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>{count}</Text>
                </ImageBackground>
            );
        }
        const height = `${Math.round((count / max) * 100)}%`;
        return <Image source={his} style={{ width: '100%', height }} key={label} />;
    });

export default ColorBar;
