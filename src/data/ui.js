import _ from 'lodash';

export const ui = {
    heroes: require('../../assets/ui/heroes.png'),
    creeps: require('../../assets/ui/creeps.png'),
    improve: require('../../assets/ui/improve.png'),
    spells: require('../../assets/ui/spells.png'),
    weapon: require('../../assets/ui/weapon.png'),
    armor: require('../../assets/ui/armor.png'),
    accessory: require('../../assets/ui/accessory.png'),
    consumable: require('../../assets/ui/consumable.png'),
    gold: require('../../assets/ui/gold.png'),
    red: require('../../assets/ui/card_list_bg_red.png'),
    green: require('../../assets/ui/card_list_bg_green.png'),
    black: require('../../assets/ui/card_list_bg_black.png'),
    blue: require('../../assets/ui/card_list_bg_blue.png'),
    item: require('../../assets/ui/card_list_bg_item.png')
};

export default _.toArray(ui);
