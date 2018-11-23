import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, Container, Left } from 'native-base';

import { ui } from '../../data/ui';
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
            <Container>
                <Content bounces={false} style={styles.content}>
                    <Image source={ui.drawerCover} style={styles.drawerCover} />
                    <Image square source={ui.drawerImage} style={styles.drawerImage} />
                    <List
                        dataArray={datas}
                        renderRow={data => (
                            <ListItem
                                underlayColor="#150f19"
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}
                            >
                                <Left>
                                    <Icon
                                        active
                                        name={data.icon}
                                        style={{ color: '#777', fontSize: 26, width: 30 }}
                                    />
                                    <Text style={styles.text}>{data.name}</Text>
                                </Left>
                            </ListItem>
                        )}
                    />
                </Content>
            </Container>
        );
    }
}

export default SideBar;
