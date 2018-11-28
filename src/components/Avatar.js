import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import { Image } from 'react-native-expo-image-cache';

const Avatar = ({ item, height, round }) => (
    <View
        style={{
            borderWidth: 1,
            borderColor: '#42565f',
            width: height,
            height
        }}
    >
        {item ? (
            <Image uri={item.ingame_image.default} style={{ height: '100%', width: '100%' }} />
        ) : (
            <View style={{ paddingTop: 2 }}>
                <Text style={{ textAlign: 'center', fontSize: 10 }}>ROUND</Text>
                <Text style={{ textAlign: 'center', fontSize: 22 }}>{round}</Text>
            </View>
        )}
    </View>
);

export default Avatar;
