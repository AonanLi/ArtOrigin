import React from 'react';
import { Button, Icon } from 'native-base';

const IconButton = ({ onPress, icon, style }) => (
    <Button transparent onPress={onPress}>
        <Icon name={icon} style={style} />
    </Button>
);

export default IconButton;
