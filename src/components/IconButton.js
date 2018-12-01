import React from 'react';
import { Button, Icon } from 'native-base';

const IconButton = ({ onPress, icon, style, buttonStyle }) => (
    <Button transparent onPress={onPress} style={buttonStyle}>
        <Icon name={icon} style={style} />
    </Button>
);

export default IconButton;
