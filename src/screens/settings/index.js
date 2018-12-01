import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Content, Icon, Left, Right, Body, ListItem, Text } from 'native-base';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';

import languages from '../../data/languages';

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
        <Background>
            <Header>
                <Left>
                    <IconButton onPress={() => navigation.navigate('DrawerOpen')} icon="ios-menu" />
                </Left>
                <Body>
                    <Title>Settings</Title>
                </Body>
            </Header>
            <Content style={{ paddingTop: 8 }}>
                {lists.map((s, i) => {
                    const { icon, label, path, options } = s;
                    const value = _.get(settings, path, '');
                    const formatValue = options
                        ? _.find(options, o => o.value === value).label
                        : value;
                    return (
                        <ListItem
                            underlayColor="#150f19"
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
            </Content>
        </Background>
    );
};

export default connect(state => ({ settings: state.settings }), {})(Settings);
