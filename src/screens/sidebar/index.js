import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Text, ListItem, Icon, Left } from 'native-base';

import Background from '../../components/Background';

import ui from '../../data/ui';
import styles from './style';

const datas = [
    {
        name: 'Cards',
        route: 'App',
        icon: 'ios-albums'
    },
    {
        name: 'Settings',
        route: 'Set',
        icon: 'ios-settings'
    }
];

class SideBar extends Component {
    render() {
        return (
            <Background path="sidebar">
                <Content bounces={false}>
                    <Image source={ui.drawerCover} style={styles.drawerCover} />
                    <Image square source={ui.drawerImage} style={styles.drawerImage} />
                    {datas.map(data => (
                        <ListItem
                            key={data.route}
                            underlayColor="#150f19"
                            button
                            noBorder
                            onPress={() => this.props.navigation.navigate(data.route)}
                        >
                            <Left>
                                <Icon
                                    active
                                    name={data.icon}
                                    style={{ color: '#cad4ff', fontSize: 26, width: 30 }}
                                />
                                <Text style={styles.text}>{data.name}</Text>
                            </Left>
                        </ListItem>
                    ))}
                </Content>
            </Background>
        );
    }
}

export default SideBar;
