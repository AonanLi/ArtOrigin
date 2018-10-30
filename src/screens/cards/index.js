import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Right,
    Body
} from 'native-base';

import styles from './styles';

class Cards extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cards</Title>
                    </Body>
                    <Right />
                </Header>

                <Content padder>
                    <Text>Cards goes here</Text>
                </Content>
            </Container>
        );
    }
}

export default Cards;
