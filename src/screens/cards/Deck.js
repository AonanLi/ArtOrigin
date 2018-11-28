import React from 'react';
import { View, ImageBackground } from 'react-native';
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

const height = 48;

const Deck = ({ deck, ...passProps }) => {
    const { heroes, cards, name } = deck;
    const hero_count = _.compact(heroes).length;
    const hero_text = `${hero_count} HEROES`;
    const partition = _.partition(cards, c => c.card_type === 'Item');
    const costs = _.times(8).map(i => {
        const cost = i + 1;
        const records = partition[1].filter(
            c => (cost === 8 ? c.mana_cost >= 8 : c.mana_cost === cost)
        );
        return { cost, records };
    });
    const max_count = _.max(costs.map(c => c.records.length));
    return (
        <Background path="sidebar">
            <ImageBackground source={ui.header} style={style.header}>
                <Text style={{ fontSize: 14, marginTop: 5, ...style.view }}>{name}</Text>
            </ImageBackground>
            <View style={style.view}>
                <AlertText
                    condition={hero_count !== 5}
                    text={hero_text}
                    align="flex-start"
                    style={{ marginTop: 12, marginBottom: -10 }}
                />
                <View style={style.between}>
                    {heroes
                        .slice(0, 3)
                        .map((hero, i) => <Avatar key={i} item={hero} height={height} round={1} />)}
                    <Divider length={height} />
                    <Avatar item={heroes[3]} height={height} round={2} />
                    <Divider length={height} />
                    <Avatar item={heroes[4]} height={height} round={3} />
                </View>
                <View style={style.around}>
                    <TypeCounter cards cards={partition[1]} />
                    <TypeCounter item cards={partition[0]} />
                </View>
                <View style={style.between}>
                    {costs.map(c => <CostCounter item={c} max={max_count} key={c.cost} />)}
                    <CostCounter item={{ cost: 'All', records: partition[1] }} />
                </View>
                <CardList cards={cards} color="#150f19" {...passProps} />
            </View>
        </Background>
    );
};

export default Deck;

const style = {
    header: {
        height: 30,
        width: '100%'
    },
    view: {
        marginLeft: 16,
        marginRight: 16
    },
    between: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 16
    },
    around: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};
