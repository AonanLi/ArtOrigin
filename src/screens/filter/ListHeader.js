import React from 'react';
import { View } from 'react-native';
import { Text, List, ListItem } from 'native-base';

import styles from './style';

const ListHeader = ({ text, visible, children }) => {
    if (visible) {
        return (
            <View>
                {text ? (
                    <ListItem itemHeader>
                        <Text>{text}</Text>
                    </ListItem>
                ) : (
                    false
                )}
                <ListItem noBorder style={styles.row}>
                    {children}
                </ListItem>
            </View>
        );
    }
    return false;
};

export default ListHeader;
