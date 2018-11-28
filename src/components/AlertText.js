import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base';

import ui from '../data/ui';

const AlertText = ({ condition, text, align, style }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: align || 'center',
            ...(style || {})
        }}
    >
        {condition && (
            <Image
                source={ui.alert}
                style={{
                    height: 10,
                    width: 10,
                    marginTop: 4,
                    marginRight: 4
                }}
            />
        )}
        <Text style={{ fontSize: 12 }}>{text}</Text>
    </View>
);

export default AlertText;
