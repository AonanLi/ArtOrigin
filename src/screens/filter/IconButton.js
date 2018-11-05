import React, { Component } from 'react';
import { Button, Icon, Text } from 'native-base';

const IconButton = ({ item, selected, onChange }) => {
    const { text, icon, value } = item;
    return (
        <Button
            style={{ width: 120 }}
            small
            iconLeft
            bordered={!selected}
            onPress={() => onChange('mode', value)}
        >
            <Icon name={icon} style={{ fontSize: 18 }} />
            <Text>{text}</Text>
        </Button>
    );
};

export default IconButton;
