import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body } from 'native-base';
import { Image } from 'react-native-expo-image-cache';

const Card = ({ navigation }) => {
    const { card_name, large_image } = navigation.state.params.item;
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{card_name.english}</Title>
                </Body>
            </Header>
            <Content padder>
                <Image uri={large_image.default} style={{ width: 300, height: 507 }} />
            </Content>
        </Container>
    );
};

export default Card;
