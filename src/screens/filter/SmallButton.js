import React, { Component } from 'react';
import { Button } from 'native-base';

const SmallButton = ({ item, onChange, record, children }) => {
    const { label, value } = item;
    const theme = value || '#424242';
    const selected = record[label];
    return (
        <Button
            small
            bordered
            onPress={() => onChange(label, !selected)}
            style={{
                width: 50,
                borderColor: theme,
                backgroundColor: selected ? theme : 'transparent'
            }}
        >
            {children}
        </Button>
    );
};

export default SmallButton;
