import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Image } from 'react-native-expo-image-cache';
import i18n from 'i18n-js';

const Avatar = ({ item, height, round, navigate }) => (
    <View
        style={{
            borderWidth: 1,
            borderColor: '#42565f',
            width: height,
            height
        }}
    >
        {item.id ? (
            <Image uri={item.ingame_image.default} style={{ height: '100%', width: '100%' }} />
        ) : (
            <View style={{ paddingTop: 2 }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>{i18n.t('Round')}</Text>
                <Text style={{ textAlign: 'center', fontSize: 22 }}>{round}</Text>
            </View>
        )}
    </View>
);

export default Avatar;
