import React from 'react';
import { Image, Platform, View } from 'react-native';
import { Content, Text, ListItem, Icon, Left } from 'native-base';
import i18n from 'i18n-js';

import Background from '../../components/Background';

import ui from '../../data/ui';
import { windowWidth, windowHeight } from '../../utils/dimensions';

const SideBar = ({ navigation }) => {
    const data = [
        {
            name: i18n.t('Cards'),
            route: 'App',
            icon: 'ios-albums'
        },
        {
            name: i18n.t('Deck'),
            route: 'DeckApp',
            icon: 'ios-journal'
        },
        {
            name: i18n.t('Settings'),
            route: 'Set',
            icon: 'ios-settings'
        }
    ];

    return (
        <Background>
            <Content bounces={false}>
                <View style={style.outer}>
                    <View style={style.inner}>
                        <Image square source={ui.drawerImage} style={style.drawerImage} />
                    </View>
                </View>
                {data.map(d => (
                    <ListItem
                        key={d.route}
                        underlayColor="rgba(21, 15, 26, 0.35)"
                        button
                        noBorder
                        onPress={() => {
                            navigation.closeDrawer();
                            navigation.navigate(d.route);
                        }}
                    >
                        <Left>
                            <Icon d name={d.icon} style={style.icon} />
                            <Text style={style.text}>{d.name}</Text>
                        </Left>
                    </ListItem>
                ))}
            </Content>
        </Background>
    );
};

export default SideBar;

const style = {
    outer: {
        width: '100%',
        height: windowHeight / 3.5,
        backgroundColor: '#150f19',
        justifyContent: 'center',
        textAlign: 'center'
    },
    inner: { flexDirection: 'row', justifyContent: 'center' },
    icon: { color: '#cad4ff', fontSize: 26, width: 30 },
    drawerImage: {
        width: 210,
        height: 84
    },
    text: {
        fontWeight: Platform.OS === 'ios' ? '500' : '400',
        fontSize: 16,
        marginLeft: 20
    }
};
