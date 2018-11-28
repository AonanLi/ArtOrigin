import React from 'react';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';

const CardList = ({ cards, language, navigate, color }) => (
    <View style={{ backgroundColor: color || 'transparent' }}>
        <FlatList
            style={{ padding: 8 }}
            data={cards}
            renderItem={({ item }) => (
                <ListItem item={item} language={language} navigate={navigate} />
            )}
            getItemLayout={(data, index) => ({
                length: 45,
                offset: 45 * index,
                index
            })}
        />
    </View>
);

export default CardList;
