import React from 'react';
import { Button, Icon } from 'native-base';

const IconButton = ({ onPress, icon, hide, style, buttonStyle }) =>
    hide ? (
        <Button transparent style={{ marginRight: 38 }} />
    ) : (
        <Button transparent onPress={onPress} style={buttonStyle}>
            <Icon name={icon} style={style} />
        </Button>
    );

export default IconButton;
