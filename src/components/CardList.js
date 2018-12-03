import React from 'react';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';

const CardList = ({ cards, language, navigate, style }) => {
    console.log(cards.length);
    return (
        <View style={{ backgroundColor: 'transparent', ...(style ? style : {}) }}>
            <FlatList
                style={{ padding: 8 }}
                data={cards}
                renderItem={({ item }) => (
                    <ListItem item={item} language={language} navigate={navigate} />
                )}
                keyExtractor={item => item.card_id.toString()}
                getItemLayout={(data, index) => ({
                    length: 45,
                    offset: 45 * index,
                    index
                })}
            />
        </View>
    );
};
export default CardList;
