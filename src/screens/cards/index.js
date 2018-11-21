import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import _ from 'lodash';

import styles from './styles';

const deviceWidth = Dimensions.get('window').width;
const col = deviceWidth < 494 ? 3 : deviceWidth < 887 ? 6 : 7;

class Cards extends Component {
    // onChange = (field, value) => this.setState({ [field]: value });
    render() {
        const { cards, navigation, language } = this.props;
        const row = Math.ceil(_.size(cards) / col);
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
                <Content padder>
                    {_.times(row).map((r, ri) => (
                        <View style={styles.imageRow} key={ri}>
                            <View style={styles.imageColumn}>
                                {_.times(col).map((c, ci) => {
                                    const index = ri * col + ci;
                                    if (index > cards.length - 1) {
                                        return false;
                                    }
                                    const item = cards[index];
                                    const path =
                                        item.large_image[language] || item.large_image.default;
                                    if (!path) {
                                        console.log(item);
                                        return false;
                                    }
                                    return (
                                        <TouchableOpacity
                                            key={ci}
                                            activeOpacity={0.8}
                                            onPress={() => navigate('Card', { item })}
                                        >
                                            <Image uri={path} style={{ height: 168, width: 99 }} />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
                </Content>
            </Container>
        );
    }
}

export default connect(
    state => ({
        cards: _.filter(
            state.cardsets.sets[1].card_list,
            c => c.card_type !== 'Passive Ability' && c.card_type !== 'Ability'
        ),
        language: state.settings.language
    }),
    {}
)(Cards);
