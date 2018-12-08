import React from 'react';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';

import { isSmall } from '../utils/dimensions';

const CardList = ({ cards, style, ...passProps }) => (
    <View style={{ backgroundColor: 'transparent', ...(style ? style : {}) }}>
        <FlatList
            style={isSmall ? {} : { marginTop: 8, paddingLeft: 8, paddingRight: 8 }}
            data={cards}
            renderItem={({ item }) => <ListItem item={item} {...passProps} />}
            keyExtractor={item => item.card_id.toString()}
            getItemLayout={(data, index) => ({
                length: 45,
                offset: 45 * index,
                index
            })}
        />
    </View>
);

export default CardList;
