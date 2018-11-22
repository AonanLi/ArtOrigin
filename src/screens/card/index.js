import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body } from 'native-base';
import { Image } from 'react-native-expo-image-cache';

import defaultGet from '../../utils/defaultGet';

const Card = ({ navigation }) => {
    const { item, language } = navigation.state.params;
    const { card_name, large_image } = item;
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{defaultGet(card_name, language, 'english')}</Title>
                </Body>
            </Header>
            <Content padder>
                <Image
                    uri={defaultGet(large_image, language, 'default')}
                    style={{ width: 300, height: 507 }}
                />
            </Content>
        </Container>
    );
};

export default Card;
