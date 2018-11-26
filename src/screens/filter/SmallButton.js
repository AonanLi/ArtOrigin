import React, { Component } from 'react';
import { Button } from 'native-base';

const SmallButton = ({ item, onChange, record, children }) => {
    const { label, value, unselected } = item;
    const theme = value || '#424242';
    const unselectedTheme = unselected || '#262626';
    const selected = record.includes(label);
    const style = selected
        ? {
              width: 50,
              borderColor: '#cad4ff',
              backgroundColor: theme,
              elevation: 4,
              shadowColor: '#cad4ff',
              shadowOpacity: 0.4,
              shadowRadius: 8
          }
        : {
              width: 50,
              borderColor: 'transparent',
              backgroundColor: unselectedTheme
          };
    return (
        <Button small bordered onPress={() => onChange(label)} style={style}>
            {children}
        </Button>
    );
};

export default SmallButton;
