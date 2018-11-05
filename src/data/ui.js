import _ from 'lodash';

export const ui = {
    creeps: require('../../assets/ui/creeps.png'),
    improve: require('../../assets/ui/improve.png'),
    spells: require('../../assets/ui/spells.png'),
    heroes: require('../../assets/ui/heroes.png'),
    weapon: require('../../assets/ui/weapon.png'),
    armor: require('../../assets/ui/armor.png'),
    accessory: require('../../assets/ui/accessory.png'),
    consumable: require('../../assets/ui/consumable.png'),
    gold: require('../../assets/ui/gold.png')
};

export default _.toArray(ui);
