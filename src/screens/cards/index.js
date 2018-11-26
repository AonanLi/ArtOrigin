import React, { PureComponent } from 'react';
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
import defaultGet from '../../utils/defaultGet';

class Cards extends PureComponent {
    render() {
        const { cards, language, navigation } = this.props;
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
                <Content>
                    <FlatList
                        style={{ padding: 8 }}
                        data={cards}
                        renderItem={({ item }) => (
                            <ListItem item={item} language={language} navigate={navigate} />
                        )}
                        getItemLayout={(data, index) => ({ length: 45, offset: 45 * index, index })}
                    />
                </Content>
            </Container>
        );
    }
}

const colorOrder = ({ is_red, is_green, is_blue, is_black }) => {
    if (is_red) {
        return 0;
    }
    if (is_green) {
        return 1;
    }
    if (is_blue) {
        return 2;
    }
    if (is_black) {
        return 3;
    }
};

const sort = cards => {
    const heroParts = _.partition(cards, c => c.card_type === 'Hero');
    const itemParts = _.partition(heroParts[1], c => c.card_type === 'Item');
    const first = _.sortBy(heroParts[0], c => colorOrder(c));
    const second = _.sortBy(itemParts[1], c => colorOrder(c), c => c.mana_cost);
    const third = _.sortBy(itemParts[0], c => c.gold_cost);
    return _.flatten([first, second, third]);
};

const allSelected = array => array.length === 0 || array.length === 4;

const rangeEx = (path, filters) => c =>
    _.isUndefined(c[path]) || (c[path] >= filters[path][0] && c[path] <= filters[path][1]);

const heroRangeEx = (path, filters) => c =>
    c.card_type !== 'Hero' ||
    ((c[path] || 0) >= filters[path][0] && (c[path] || 0) <= filters[path][1]);

const filter = (cards, filters, language) => {
    const { color, rarity, card_type, sub_type, keyword } = filters;

    const colorEx = allSelected(color) ? c => c : c => _.find(color, co => c[co]);
    const rarityEx = allSelected(rarity)
        ? c => c
        : c => _.find(rarity, r => (r === 'Basic' && !c.rarity) || r === c.rarity);
    const cardTypeEx = allSelected(card_type)
        ? c => c
        : c => _.find(card_type, t => c.card_type === t);
    const subTypeEx = sub_type.length === 0 ? c => c : c => _.find(sub_type, t => c.sub_type === t);
    const manaEx = rangeEx('mana_cost', filters);
    const goldEx = rangeEx('gold_cost', filters);
    const attackEx = heroRangeEx('attack', filters);
    const armorEx = heroRangeEx('armor', filters);
    const hpEx = heroRangeEx('hit_points', filters);
    const keywordEx = c =>
        defaultGet(c.card_name, language, 'english', false, true)
            .toLowerCase()
            .includes(keyword.toLowerCase());

    return cards.filter(
        c =>
            colorEx(c) &&
            rarityEx(c) &&
            cardTypeEx(c) &&
            subTypeEx(c) &&
            manaEx(c) &&
            goldEx(c) &&
            attackEx(c) &&
            armorEx(c) &&
            hpEx(c) &&
            keywordEx(c)
    );
};

export default connect(
    state => ({
        cards: sort(filter(state.cardsets.cards, state.filters, state.settings.language)),
        language: state.settings.language
    }),
    {}
)(Cards);
