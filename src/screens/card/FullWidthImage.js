import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import defaultGet from '../../utils/defaultGet';

const width = Dimensions.get('window').width - 36;
const height = 1.69 * width;

const FullWidthImage = ({ uri }) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20
        }}
    >
        <Image uri={uri} style={{ width, height }} />
    </View>
);

export default FullWidthImage;
