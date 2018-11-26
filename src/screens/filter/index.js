import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Content } from 'native-base';
import _ from 'lodash';

import SearchBar from './SearchBar';
import ListHeader from './ListHeader';
import SmallButton from './SmallButton';
import Slider from './Slider';
import Background from '../../components/Background';

import { ui } from '../../data/ui';
import styles from './style';
import * as filters from '../../actions/filters';

const colors = [
    { label: 'is_red', value: '#7B2435', unselected: '#4f1722' },
    { label: 'is_green', value: '#4C733C', unselected: '#2c4323' },
    { label: 'is_blue', value: '#145982', unselected: '#0a2e42' },
    { label: 'is_black', value: '#25242A', unselected: '#0c0c0e' }
];

const rarities = [
    { label: 'Basic', value: '#E0E0E0', unselected: '#999999' },
    { label: 'Common', value: '#5D4037', unselected: '#30211c' },
    { label: 'Uncommon', value: '#424242', unselected: '#262626' },
    { label: 'Rare', value: '#FFD740', unselected: '#b38c00' }
];

const card_types = [
    { label: 'Hero', icon: ui.heroes },
    { label: 'Spell', icon: ui.spells },
    { label: 'Creep', icon: ui.creeps },
    { label: 'Improvement', icon: ui.improve }
];

const sub_types = [
    { label: 'Weapon', icon: ui.weapon },
    { label: 'Armor', icon: ui.armor },
    { label: 'Accessory', icon: ui.accessory },
    { label: 'Consumable', icon: ui.consumable }
];

class Filter extends Component {
    constructor() {
        super();
        this.state = { locked: false };
    }

    lock = locked => this.setState({ locked });

    render() {
        const {
            filterState,
            resetFilter,
            setFilterValue,
            setColor,
            setCardType,
            setSubType,
            setRarity
        } = this.props;
        const {
            card_type,
            sub_type,
            keyword,
            color,
            rarity,
            mana_cost,
            gold_cost,
            attack,
            armor,
            hit_points
        } = filterState;
        const showMana =
            card_type.includes('Spell') ||
            card_type.includes('Creep') ||
            card_type.includes('Improvement');
        const showGold = !_.isEmpty(sub_type);
        const hasHero = card_type.includes('Hero');

        return (
            <Background path="sidebar">
                <SearchBar onChange={setFilterValue} reset={resetFilter} keyword={keyword} />
                <Content scrollEnabled={!this.state.locked} keyboardShouldPersistTaps="never">
                    <ListHeader text="COLOR">
                        {colors.map(c => (
                            <SmallButton
                                key={c.label}
                                item={c}
                                record={color}
                                onChange={setColor}
                            />
                        ))}
                    </ListHeader>
                    <ListHeader text="RARITY">
                        {rarities.map(r => (
                            <SmallButton
                                key={r.label}
                                item={r}
                                record={rarity}
                                onChange={setRarity}
                            />
                        ))}
                    </ListHeader>
                    <ListHeader text="TYPE">
                        {card_types.map(t => (
                            <SmallButton
                                key={t.label}
                                item={t}
                                record={card_type}
                                onChange={setCardType}
                            >
                                <Image source={t.icon} style={styles.buttonImage} />
                            </SmallButton>
                        ))}
                    </ListHeader>
                    <ListHeader>
                        {sub_types.map(t => (
                            <SmallButton
                                key={t.label}
                                item={t}
                                record={sub_type}
                                onChange={setSubType}
                            >
                                <Image source={t.icon} style={styles.buttonImage} />
                            </SmallButton>
                        ))}
                    </ListHeader>
                    <ListHeader hide={!showMana} text="MANA">
                        <Slider
                            max={10}
                            color="#145982"
                            record={mana_cost}
                            path="mana_cost"
                            onChange={setFilterValue}
                            lock={this.lock}
                        />
                    </ListHeader>
                    <ListHeader hide={!showGold} text="GOLD">
                        <Slider
                            max={25}
                            color="#F4D35E"
                            record={gold_cost}
                            path="gold_cost"
                            onChange={setFilterValue}
                            lock={this.lock}
                        />
                    </ListHeader>
                    <ListHeader hide={!hasHero} text="STATS">
                        <Slider
                            max={20}
                            icon={ui.weapon}
                            color="#7B2435"
                            record={attack}
                            path="attack"
                            onChange={setFilterValue}
                            lock={this.lock}
                        />
                    </ListHeader>
                    <ListHeader hide={!hasHero}>
                        <Slider
                            max={20}
                            icon={ui.armor}
                            color="#145982"
                            record={armor}
                            path="armor"
                            onChange={setFilterValue}
                            lock={this.lock}
                        />
                    </ListHeader>
                    <ListHeader hide={!hasHero}>
                        <Slider
                            max={20}
                            icon={ui.accessory}
                            color="#4C733C"
                            record={hit_points}
                            path="hit_points"
                            onChange={setFilterValue}
                            lock={this.lock}
                        />
                    </ListHeader>
                </Content>
            </Background>
        );
    }
}

export default connect(state => ({ filterState: state.filters }), filters)(Filter);
