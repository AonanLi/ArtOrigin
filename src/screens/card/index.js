import React, { Component } from 'react';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body } from 'native-base';
import { Image } from 'react-native';

const Card = ({ navigation }) => {
    const { name, path } = navigation.state.params.item;
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{name}</Title>
                </Body>
            </Header>
            <Content padder>
                <Image source={path} />
            </Content>
        </Container>
    );
};

export default Card;
