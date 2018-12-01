import React from 'react';
import { Button, Text } from 'native-base';

const FullButton = ({ onPress, disabled, style, text }) => (
    <Button
        full
        warning
        onPress={onPress}
        disabled={disabled}
        style={{ marginLeft: 20, marginRight: 20, ...(style ? style : {}) }}
    >
        <Text style={{ color: 'black' }}>{text}</Text>
    </Button>
);

export default FullButton;
