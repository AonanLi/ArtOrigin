import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Content, Container, List } from 'native-base';
import _ from 'lodash';

import SearchBar from './SearchBar';
import IconButton from './IconButton';
import ListHeader from './ListHeader';
import SmallButton from './SmallButton';
import Slider from './Slider';

import { ui } from '../../data/ui';
import styles from './style';

const colors = [
    { label: 'red', value: '#F44336' },
    { label: 'green', value: '#00C853' },
    { label: 'blue', value: '#2196F3' },
    { label: 'black', value: '#212121' }
];
const rarity = [
    { label: 'basic', value: '#E0E0E0' },
    { label: 'common', value: '#5D4037' },
    { label: 'uncommon', value: '#424242' },
    { label: 'rare', value: '#FFD740' }
];
const types = [
    { label: 'heroes', icon: ui.heroes },
    { label: 'spells', icon: ui.spells },
    { label: 'creeps', icon: ui.creeps },
    { label: 'improve', icon: ui.improve }
];
const items = [
    { label: 'weapon', icon: ui.weapon },
    { label: 'armor', icon: ui.armor },
    { label: 'accessory', icon: ui.accessory },
    { label: 'consumable', icon: ui.consumable }
];
const modes = [
    { text: 'Card View', icon: 'md-apps', value: 'card' },
    { text: 'List View', icon: 'md-list', value: 'list' }
];

const buttonState = _.reduce(
    _.keyBy(_.flatten([colors, rarity, types, items]), i => i.label),
    (r, v, k) => ({ ...r, [k]: false }),
    {}
);

const defaultState = {
    ...buttonState,
    mana: [0, 10],
    gold: [0, 25],
    attack: [0, 20],
    defense: [0, 20],
    health: [0, 20],
    keyword: ''
};

class Filter extends Component {
    constructor() {
        super();
        this.state = { ...defaultState, mode: 'card', locked: false };
    }

    onChange = (field, value) => this.setState({ [field]: value });

    reset = () => this.setState(defaultState);

    render() {
        const { onChange, reset, state } = this;
        const { heroes, keyword, mode, locked } = state;
        const showMana = _.find(types, t => t.label !== 'heroes' && state[t.label]);
        const showGold = _.find(items, i => state[i.label]);
        return (
            <Container>
                <SearchBar onChange={onChange} reset={reset} keyword={keyword} />
                <Content
                    scrollEnabled={!locked}
                    style={styles.content}
                    keyboardShouldPersistTaps="never"
                >
                    <List>
                        <ListHeader visible text="VIEW">
                            {modes.map((m, i) => (
                                <IconButton
                                    key={i}
                                    item={m}
                                    selected={mode === m.value}
                                    onChange={onChange}
                                />
                            ))}
                        </ListHeader>
                        <ListHeader visible text="COLOR">
                            {colors.map((c, i) => (
                                <SmallButton key={i} item={c} record={state} onChange={onChange} />
                            ))}
                        </ListHeader>
                        <ListHeader visible text="RARITY">
                            {rarity.map((r, i) => (
                                <SmallButton key={i} item={r} record={state} onChange={onChange} />
                            ))}
                        </ListHeader>
                        <ListHeader visible text="TYPE">
                            {types.map((t, i) => (
                                <SmallButton key={i} item={t} record={state} onChange={onChange}>
                                    <Image source={t.icon} style={styles.buttonImage} />
                                </SmallButton>
                            ))}
                        </ListHeader>
                        <ListHeader visible>
                            {items.map((t, i) => (
                                <SmallButton key={i} item={t} record={state} onChange={onChange}>
                                    <Image source={t.icon} style={styles.buttonImage} />
                                </SmallButton>
                            ))}
                        </ListHeader>
                        <ListHeader visible={showMana} text="MANA">
                            <Slider
                                label="mana"
                                max={10}
                                color="#2196F3"
                                record={state}
                                onChange={onChange}
                            />
                        </ListHeader>
                        <ListHeader visible={showGold} text="GOLD">
                            <Slider
                                label="gold"
                                max={25}
                                color="#FFD740"
                                record={state}
                                onChange={onChange}
                            />
                        </ListHeader>
                        <ListHeader visible={heroes} text="STATS">
                            <Slider
                                label="attack"
                                max={20}
                                icon={ui.weapon}
                                color="#B71C1C"
                                record={state}
                                onChange={onChange}
                            />
                        </ListHeader>
                        <ListHeader visible={heroes}>
                            <Slider
                                label="defense"
                                max={20}
                                icon={ui.armor}
                                color="#2196F3"
                                record={state}
                                onChange={onChange}
                            />
                        </ListHeader>
                        <ListHeader visible={heroes}>
                            <Slider
                                label="health"
                                max={20}
                                icon={ui.accessory}
                                color="#4CAF50"
                                record={state}
                                onChange={onChange}
                            />
                        </ListHeader>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Filter;
