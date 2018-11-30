import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import { Text } from 'native-base';
import _ from 'lodash';

import Background from '../../components/Background';
import AlertText from '../../components/AlertText';
import Avatar from '../../components/Avatar';
import Divider from '../../components/Divider';
import TypeCounter from '../../components/TypeCounter';
import CostCounter from '../../components/CostCounter';
import CardList from '../../components/CardList';

import ui from '../../data/ui';
import isBigScreen from '../../utils/isBigScreen';
import countCards from '../../utils/countCards';

const height = 48;

const Deck = ({ current_deck, ...passProps }) => {
    const { heroes, cards, name } = current_deck;
    const hero_count = heroes.filter(h => h.id).length;
    const hero_text = `${hero_count} HEROES`;
    const partition = _.partition(cards, c => c.card_type === 'Item');
    const costs = _.times(8).map(i => {
        const cost = i + 1;
        const records = partition[1].filter(
            c => (cost === 8 ? c.mana_cost >= 8 : c.mana_cost === cost)
        );
        return { cost, records };
    });
    const max_count = _.max(costs.map(c => countCards(c.records)));
    return (
        <Background>
            <ImageBackground source={ui.header} style={style.header}>
                <Text style={style.text}>{name}</Text>
            </ImageBackground>
            <View style={style.view}>
                <AlertText
                    condition={hero_count !== 5}
                    text={hero_text}
                    align="flex-start"
                    style={style.alertText}
                />
                <View style={style.avatar}>
                    {heroes
                        .filter(h => h.turn === 1)
                        .map((h, i) => <Avatar key={i} item={h} height={height} round={1} />)}
                    <Divider length={height} />
                    <Avatar item={_.find(heroes, h => h.turn === 2)} height={height} round={2} />
                    <Divider length={height} />
                    <Avatar item={_.find(heroes, h => h.turn === 3)} height={height} round={3} />
                </View>
                <View style={style.type}>
                    <TypeCounter cards cards={partition[1]} />
                    <TypeCounter item cards={partition[0]} />
                </View>
                <View style={style.cost}>
                    {costs.map(c => <CostCounter item={c} max={max_count} key={c.cost} />)}
                    <CostCounter item={{ cost: 'All', records: partition[1] }} />
                </View>
                <CardList cards={cards} style={style.list} {...passProps} />
            </View>
        </Background>
    );
};

export default Deck;

const marginLeftRight = isBigScreen ? 128 : 16;
const marginBottom = isBigScreen ? 16 : 12;
const listHeight = Dimensions.get('window').height - 3 * marginBottom - 325;

const style = {
    header: {
        height: 30,
        width: '100%'
    },
    alertText: {
        marginTop: 8,
        marginBottom: 4
    },
    text: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: marginLeftRight,
        marginRight: marginLeftRight
    },
    view: {
        marginLeft: marginLeftRight,
        marginRight: marginLeftRight
    },
    avatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: marginBottom
    },
    type: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: marginBottom
    },
    cost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: marginBottom
    },
    list: {
        backgroundColor: '#150f19',
        height: listHeight
    }
};
