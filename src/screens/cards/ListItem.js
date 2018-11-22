import React from 'react';
import { Text } from 'native-base';
import { View, ImageBackground, TouchableOpacity, Image as NativeImage } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { ui } from '../../data/ui';

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

const getCost = ({ mana_cost, gold_cost }) => mana_cost || gold_cost;

const ListItem = ({ item, language, navigate }) => {
    const path = item.mini_image.default;
    const text = item.card_name[language] || item.card_name.english;
    const background = getBackground(item);
    const type = getType(item);
    const cost = getCost(item);
    return (
        <TouchableOpacity onPress={() => navigate('Card', { item })} activeOpacity={0.8}>
            <ImageBackground
                source={background}
                style={{
                    height: 45,
                    width: '100%',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Image uri={path} style={{ height: 45, width: 45, flex: 1 }} />
                <View
                    style={{
                        flex: 8,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 12
                    }}
                >
                    >
                    <NativeImage
                        source={type}
                        style={{
                            height: 32,
                            width: 32,
                            marginTop: -4
                        }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            color: 'white',
                            marginLeft: 10
                        }}
                    >
                        {cost}
                    </Text>
                    <Text style={{ flex: 5, color: 'white' }}>{text}</Text>
                    <Text style={{ flex: 1, color: 'white' }}>x3</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default ListItem;
