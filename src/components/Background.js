import React from 'react';
import { Container } from 'native-base';
import { ImageBackground } from 'react-native';

import { ui } from '../data/ui';

const Background = ({ children }) => (
    <Container>
        <ImageBackground source={ui.background} style={{ width: '100%', height: '100%' }}>
            {children}
        </ImageBackground>
    </Container>
);

export default Background;
