import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { cardWidth, cardHeight } from '../../utils/dimensions';

const FullWidthImage = ({ uri }) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20
        }}
    >
        <Image uri={uri} preview style={{ width: cardWidth, height: cardHeight }} />
    </View>
);

export default FullWidthImage;
