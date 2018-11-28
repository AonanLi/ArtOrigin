import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { Text } from 'native-base';
import _ from 'lodash';

import { colors } from '../data/types';

const ColorBar = ({ cards, max }) =>
    colors.map(color => {
        const { icon, label } = color;
        const count = cards.filter(c => c[label]).length;
        if (count === 0) {
            return false;
        }
        if (_.isUndefined(max)) {
            return (
                <ImageBackground source={icon} style={{ width: '100%' }} key={label}>
                    <Text style={{ textAlign: 'center', fontSize: 12 }}>{count}</Text>
                </ImageBackground>
            );
        }
        const height = `${(count / max) * 100}%`;
        return <Image source={icon} style={{ width: '100%', height }} key={label} />;
    });

export default ColorBar;
