import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Tab,
    Tabs
} from 'native-base';
import { FlatList } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';

import { ui } from '../../data/ui';

const typeOrders = {
    Hero: 0,
    Creep: 1,
    Improvement: 2,
    Spell: 3,
    Item: 4
};

class Cards extends Component {
    render() {
        const { cards, navigation, language } = this.props;
        const { navigate } = navigation;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigate('DrawerOpen')}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cards</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigate('Filter')}>
                            <Icon name="ios-options" />
                        </Button>
                    </Right>
                </Header>
                <Content style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <FlatList
                        style={{ padding: 8 }}
                        data={cards}
                        renderItem={({ item }) => (
                            <ListItem item={item} language={language} navigate={navigate} />
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

export default connect(
    state => ({
        cards: _.sortBy(
            state.cardsets.sets[0].card_list
                .concat(state.cardsets.sets[1].card_list)
                .filter(
                    c =>
                        c.card_type !== 'Passive Ability' &&
                        c.card_type !== 'Ability' &&
                        c.card_type !== 'Pathing' &&
                        c.card_type !== 'Stronghold'
                )
                .map(c => ({ ...c, key: c.card_id.toString() })),
            c => typeOrders[c.card_type]
        ),
        language: state.settings.language
    }),
    {}
)(Cards);
