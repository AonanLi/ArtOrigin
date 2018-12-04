import React, { PureComponent } from 'react';
import { Text } from 'native-base';
import { View, ImageBackground, TouchableOpacity, Image as NativeImage } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import i18n from 'i18n-js';
import _ from 'lodash';

import IconButton from './IconButton';

import ui from '../data/ui';
import defaultGet from '../utils/defaultGet';

class ListItem extends PureComponent {
    render() {
        const { item, language, navigate, manageDeckCards } = this.props;
        const path = item.mini_image.default;
        const text = defaultGet(item.card_name, language, 'english');
        const background = getBackground(item);
        const type = getType(item);
        const cost = getCost(item);
        const count = getCount(item);
        const disableRemove = getDisable(item, 'remove');
        const disableAdd = getDisable(item, 'add');
        const { isSig } = item;
        return (
            <TouchableOpacity onPress={() => navigate('Card', { item })} activeOpacity={0.8}>
                <ImageBackground source={background} style={style.color}>
                    <Image uri={path} style={style.mini} />
                    <View style={style.desciption}>
                        <NativeImage source={type} style={style.type} />
                        <Text style={style.cost}>{cost}</Text>
                        <View style={style.name_view}>
                            <Text style={style.name}>{text}</Text>
                            {isSig && <Text style={style.sig}>{i18n.t('SignatureCard')}</Text>}
                        </View>
                        <View style={style.count}>
                            <IconButton
                                onPress={() => manageDeckCards(item, -1)}
                                icon="ios-arrow-back"
                                hide={disableRemove}
                                style={style.arrow}
                                buttonStyle={style.button}
                            />
                            <Text style={style.number}>{count}</Text>
                            {isSig ? (
                                <Image uri={isSig} style={style.ingame} />
                            ) : (
                                <IconButton
                                    onPress={() => manageDeckCards(item, 1)}
                                    icon="ios-arrow-forward"
                                    hide={disableAdd}
                                    style={style.arrow}
                                    buttonStyle={style.button}
                                />
                            )}
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

export default ListItem;

const style = {
    color: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mini: {
        height: 45,
        width: 45,
        flex: 1
    },
    desciption: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingRight: 8
    },
    type: {
        height: 32,
        width: 32,
        marginTop: -4
    },
    cost: {
        flex: 1,
        color: 'white',
        marginLeft: 10
    },
    name_view: {
        flex: 4
    },
    name: {
        color: 'white'
    },
    sig: {
        fontSize: 8,
        marginTop: -3,
        color: 'white'
    },
    count: { flexDirection: 'row', justifyContent: 'space-between', flex: 2 },
    number: { color: 'white' },
    arrow: {
        color: '#ae9f84',
        fontSize: 14
    },
    button: {
        marginTop: -10
    },
    ingame: { height: 20, width: 20, marginLeft: 6 }
};

const getBackground = ({ is_red, is_blue, is_green, is_black, card_type }) => {
    const { red, blue, green, black, item } = ui;
    if (is_red) {
        return red;
    }
    if (is_blue) {
        return blue;
    }
    if (is_green) {
        return green;
    }
    if (is_black) {
        return black;
    }
    if (card_type === 'Item') {
        return item;
    }
};

const getType = ({ card_type, sub_type }) => {
    const { creeps, improve, spells, heroes, weapon, armor, accessory, consumable } = ui;
    switch (card_type) {
        case 'Hero':
            return heroes;
        case 'Creep':
            return creeps;
        case 'Improvement':
            return improve;
        case 'Spell':
            return spells;
        case 'Item':
            switch (sub_type) {
                case 'Weapon':
                    return weapon;
                case 'Armor':
                    return armor;
                case 'Accessory':
                    return accessory;
                case 'Consumable':
                    return consumable;
                default:
                    return null;
            }
        default:
            return null;
    }
};

const getCost = ({ mana_cost, gold_cost }) => mana_cost || gold_cost || '-';

const getCount = item => _.get(item, 'count', item.card_type === 'Hero' ? 1 : 3);

const getDisable = (item, type) => {
    const { isSig, card_type } = item;
    if (isSig) {
        return true;
    }
    const count = getCount(item);
    if (card_type === 'Hero') {
        return (type === 'add' && count > 0) || (type === 'remove' && count < 1);
    }
    return (type === 'add' && count > 2) || (type === 'remove' && count < 1);
};
