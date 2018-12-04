import React from 'react';
import { Image } from 'react-native';
import { Content, Text, ListItem, Icon, Left } from 'native-base';

import Background from '../../components/Background';

import ui from '../../data/ui';
import styles from './style';

const data = [
    {
        name: 'Cards',
        route: 'App',
        icon: 'ios-albums'
    },
    {
        name: 'Deck',
        route: 'DeckApp',
        icon: 'ios-journal'
    },
    {
        name: 'Settings',
        route: 'Set',
        icon: 'ios-settings'
    }
];

const SideBar = ({ navigation }) => (
    <Background>
        <Content bounces={false}>
            <Image source={ui.drawerCover} style={styles.drawerCover} />
            <Image square source={ui.drawerImage} style={styles.drawerImage} />
            {data.map(d => (
                <ListItem
                    key={d.route}
                    underlayColor="#150f19"
                    button
                    noBorder
                    onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate(d.route);
                    }}
                >
                    <Left>
                        <Icon
                            d
                            name={d.icon}
                            style={{ color: '#cad4ff', fontSize: 26, width: 30 }}
                        />
                        <Text style={styles.text}>{d.name}</Text>
                    </Left>
                </ListItem>
            ))}
        </Content>
    </Background>
);

export default SideBar;
