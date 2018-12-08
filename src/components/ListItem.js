import React, { Component } from 'react';
import { Text } from 'native-base';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image as NativeImage
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import i18n from 'i18n-js';
import _ from 'lodash';

import IconButton from './IconButton';

import ui from '../data/ui';
import defaultGet from '../utils/defaultGet';

class ListItem extends Component {
    shouldComponentUpdate(nextProps) {
        const { item, language, has5Heroes } = nextProps;
        return (
            getCount(item) !== getCount(this.props.item) ||
            (item.card_type === 'Hero' && has5Heroes !== this.props.has5Heroes) ||
            language !== this.props.language
        );
    }

    render() {
        const { item, navigate, language, has5Heroes, manageDeckCards } = this.props;
        const path = item.mini_image.default;
        const text = defaultGet(item.card_name, language, 'english');
        const background = getBackground(item);
        const type = getType(item);
        const cost = getCost(item);
        const count = getCount(item);
        const disableRemove = getDisable(item, 'remove');
        const disableAdd = getDisable(item, 'add', has5Heroes);
        const { isSig } = item;
        return (
            <TouchableOpacity onPress={() => navigate('Card', { item })} activeOpacity={0.6}>
                <ImageBackground source={background} style={style.color}>
                    <Image uri={path} style={style.mini} />
                    <View style={style.desciption}>
                        <NativeImage source={type} style={style.type} />
                        <Text style={style.cost}>{cost}</Text>
                        <View style={style.name_view}>
                            <Text style={style.name}>{text}</Text>
                            {isSig && <Text style={style.sig}>{i18n.t('SignatureCard')}</Text>}
                        </View>
                        <TouchableWithoutFeedback>
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
                                    <View style={{ width: 40 }}>
                                        <Image uri={isSig} style={style.ingame} />
                                    </View>
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
                        </TouchableWithoutFeedback>
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
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
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
        flex: 3
    },
    name: {
        color: 'white'
    },
    sig: {
        fontSize: 8,
        marginTop: -3,
        color: 'white'
    },
    count: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 2,
        marginTop: -12
    },
    number: { color: 'white', marginTop: 12 },
    arrow: {
        color: '#ae9f84',
        fontSize: 14
    },
    button: {
        marginTop: 2
    },
    ingame: { height: 20, width: 20, marginLeft: 8, marginTop: 13 }
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
                case 'Deed':
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

const getDisable = (item, type, has5Heroes) => {
    const { isSig, card_type } = item;
    if (isSig) {
        return true;
    }
    const count = getCount(item);
    if (card_type === 'Hero') {
        return (type === 'add' && (has5Heroes || count > 0)) || (type === 'remove' && count < 1);
    }
    return (type === 'add' && count > 2) || (type === 'remove' && count < 1);
};
