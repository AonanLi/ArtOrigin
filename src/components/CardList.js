import React from 'react';
import { FlatList, View } from 'react-native';

import ListItem from './ListItem';

import { isSmall } from '../utils/dimensions';
import material from '../theme/variables/material';

const CardList = ({ cards, isDeck, style, ...passProps }) => (
    <View style={{ backgroundColor: 'transparent', ...(style ? style : {}) }}>
        <FlatList
            style={isSmall ? {} : { marginTop: 8, paddingLeft: 8, paddingRight: 8 }}
            data={cards.concat({ card_id: 0 })}
            renderItem={({ item }) =>
                item.card_id ? (
                    <ListItem item={item} {...passProps} />
                ) : (
                    <View
                        style={{
                            width: 200,
                            height: material.isIphoneX ? (isDeck ? 102 : 130) : 64
                        }}
                    />
                )
            }
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
