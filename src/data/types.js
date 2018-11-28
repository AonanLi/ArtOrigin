import ui from './ui';

const {
    weapon,
    armor,
    accessory,
    consumable,
    creeps,
    improve,
    spells,
    heroes,
    red,
    green,
    blue,
    black,
    red_his,
    green_his,
    blue_his,
    black_his
} = ui;

export const colors = [
    { label: 'is_red', icon: red, his: red_his, value: '#7B2435', unselected: '#4f1722' },
    { label: 'is_green', icon: green, his: green_his, value: '#4C733C', unselected: '#2c4323' },
    { label: 'is_blue', icon: blue, his: blue_his, value: '#145982', unselected: '#0a2e42' },
    { label: 'is_black', icon: black, his: black_his, value: '#25242A', unselected: '#0c0c0e' }
];

export const rarities = [
    { label: 'Basic', value: '#E0E0E0', unselected: '#999999' },
    { label: 'Common', value: '#5D4037', unselected: '#30211c' },
    { label: 'Uncommon', value: '#424242', unselected: '#262626' },
    { label: 'Rare', value: '#FFD740', unselected: '#b38c00' }
];

export const card_types = [
    { label: 'Hero', icon: heroes },
    { label: 'Spell', icon: spells },
    { label: 'Creep', icon: creeps },
    { label: 'Improvement', icon: improve }
];

export const sub_types = [
    { label: 'Weapon', icon: weapon },
    { label: 'Armor', icon: armor },
    { label: 'Accessory', icon: accessory },
    { label: 'Consumable', icon: consumable }
];
