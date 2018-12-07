import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

const Avatar = ({ item, navigate }) => (
    <View>
        {item.id ? (
            <TouchableOpacity onPress={() => navigate('Card', { item })}>
                <Image uri={item.ingame_image.default} style={{ height: '100%', width: '100%' }} />
            </TouchableOpacity>
        ) : (
            false
        )}
    </View>
);

export default Avatar;
