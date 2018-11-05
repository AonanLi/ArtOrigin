import React, { Component } from 'react';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, Container, Left } from 'native-base';
import styles from './style';

const drawerCover = require('../../../assets/drawer-cover.png');
const drawerImage = require('../../../assets/logo-kitchen-sink.png');
const datas = [
    {
        name: 'Cards',
        route: 'Cards',
        icon: 'phone-portrait'
    }
];

class SideBar extends Component {
    render() {
        return (
            <Container>
                <Content bounces={false} style={styles.content}>
                    <Image source={drawerCover} style={styles.drawerCover} />
                    <Image square style={styles.drawerImage} source={drawerImage} />
                    <List
                        dataArray={datas}
                        renderRow={data => (
                            <ListItem
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
