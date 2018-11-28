import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import defaultGet from '../../utils/defaultGet';
import isBigScreen from '../../utils/isBigScreen';

const margin = isBigScreen ? 128 : 18;
const width = Dimensions.get('window').width - 2 * margin;
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
