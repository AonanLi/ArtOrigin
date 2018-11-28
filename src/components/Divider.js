import React from 'react';
import { View } from 'react-native';

const Avatar = ({ length, style, horizontal }) => (
    <View
        style={{
            width: horizontal ? length : 0.8,
            height: horizontal ? 0.8 : length,
            backgroundColor: '#42565f',
            ...(style || {})
        }}
    />
);

export default Avatar;
