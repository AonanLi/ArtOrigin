import React from 'react';
import { Text } from 'native-base';
import { View, ImageBackground, TouchableOpacity, Image as NativeImage } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import ui from '../data/ui';
import defaultGet from '../utils/defaultGet';

const ListItem = ({ item, language, navigate }) => {
    const path = item.mini_image.default;
    const text = defaultGet(item.card_name, language, 'english');
    const background = getBackground(item);
    const type = getType(item);
    const cost = getCost(item);
    return (
        <TouchableOpacity onPress={() => navigate('Card', { item })} activeOpacity={0.8}>
            <ImageBackground source={background} style={style.color}>
                <Image uri={path} style={style.mini} />
                <View style={style.desciption}>
                    <NativeImage source={type} style={style.type} />
                    <Text style={style.cost}>{cost}</Text>
                    <View style={style.name_view}>
                        <Text style={style.name}>{text}</Text>
                        {item.isSig && <Text style={style.sig}>Signature Card</Text>}
                    </View>
                    <Text style={style.number}>x3</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

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
        flex: 5
    },
    name: {
        color: 'white',
        textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10
    },
    sig: {
        fontSize: 8,
        marginTop: -3
    },
    number: { flex: 1, color: 'white' }
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
