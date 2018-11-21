import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    List,
    ListItem,
    Text
} from 'native-base';
import _ from 'lodash';

import languages from '../../utils/languages';

const lists = [
    {
        label: 'Language',
        path: 'language',
        icon: 'wifi',
        options: languages
    }
];

const Settings = ({ navigation, settings, editSetting }) => {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
                        <Icon name="ios-menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Settings</Title>
                </Body>
            </Header>
            <Content>
                <List style={{ paddingTop: 8 }}>
                    {lists.map((s, i) => {
                        const { icon, label, path, options } = s;
                        const value = _.get(settings, path, '');
                        const formatValue = options
                            ? _.find(options, o => o.value === value).label
                            : value;
                        return (
                            <ListItem
                                key={i}
                                icon
                                onPress={() => navigation.navigate('Setting', { s })}
                            >
                                <Body>
                                    <Text>{label}</Text>
                                </Body>
                                <Right>
                                    <Text>{formatValue}</Text>
                                    <Icon active name="arrow-forward" />
                                </Right>
                            </ListItem>
                        );
                    })}
                </List>
            </Content>
        </Container>
    );
};

export default connect(
    state => ({ settings: state.settings }),
    {}
)(Settings);
