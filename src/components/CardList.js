import React from 'react';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';

const CardList = ({ cards, style, ...passProps }) => (
    <View style={{ backgroundColor: 'transparent', ...(style ? style : {}) }}>
        <FlatList
            style={{ padding: 8 }}
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
