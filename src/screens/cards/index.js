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
import { Dimensions, Image, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';

import { cards } from '../../data/cards';
import styles from './styles';

const deviceWidth = Dimensions.get('window').width;

const col = deviceWidth < 494 ? 3 : deviceWidth < 887 ? 6 : 7;

class Cards extends Component {
    constructor() {
        super();
        this.state = {
            col,
            row: Math.ceil(_.size(cards) / col),
            data: cards
        };
    }

    componentDidMount() {
        console.log('called');
    }

    onChange = (field, value) => this.setState({ [field]: value });

    render() {
        const { col, row, data } = this.state;
        const { navigate } = this.props.navigation;
        const array = _.toArray(data);
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
                                    if (index > array.length - 1) {
                                        return false;
                                    }
                                    const key = array[index].name;
                                    const item = data[key];
                                    return (
                                        <TouchableOpacity
                                            key={ci}
                                            activeOpacity={0.8}
                                            onPress={() => navigate('Card', { item })}
                                        >
                                            <Image
                                                source={item.path}
                                                style={{ height: 168, width: 99 }}
                                            />
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

export default Cards;
