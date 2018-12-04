import React from 'react';
import { View } from 'react-native';
import { ListItem, ListHeader, Body, Right, Text } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import FullWidthImage from './FullWidthImage';
import ShowIf from '../../components/ShowIf';

import defaultGet from '../../utils/defaultGet';

const References = ({ refs, language }) => {
    const typeNames = {
        Ability: i18n.t('Active'),
        'Passive Ability': i18n.t('Passive')
    };

    const partition = _.partition(
        refs,
        c => c.card_type === 'Passive Ability' || c.card_type === 'Ability'
    );
    const ability = partition[0];
    const includes = partition[1];
    return (
        <View>
            <ShowIf condition={ability.length > 0}>
                <ListItem noBorder>
                    <Text>{i18n.t('Ability')}</Text>
                </ListItem>
                {ability.map((c, i) => (
                    <ListItem key={i} noBorder>
                        <Body>
                            <Text>{defaultGet(c.card_name, language, 'english')}</Text>
                            <Text note>{defaultGet(c.card_text, language, 'english', true)}</Text>
                        </Body>
                        <Right>
                            <Text note>{typeNames[c.card_type]}</Text>
                        </Right>
                    </ListItem>
                ))}
            </ShowIf>
            <ShowIf condition={includes.length > 0}>
                <ListItem noBorder>
                    <Text>{i18n.t('Includes')}</Text>
                </ListItem>
                {includes.map((c, i) => (
                    <FullWidthImage key={i} uri={defaultGet(c.large_image, language, 'default')} />
                ))}
            </ShowIf>
        </View>
    );
};

export default References;
