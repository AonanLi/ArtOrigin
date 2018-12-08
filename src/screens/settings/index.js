import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Content, Icon, Left, Right, Body, ListItem, Text } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';

import languages from '../../data/languages';

const Settings = ({ navigation, settings, editSetting }) => {
    const lists = [
        {
            label: i18n.t('Language'),
            path: 'language',
            icon: 'wifi',
            options: languages
        }
    ];

    return (
        <Background>
            <Header>
                <Left>
                    <IconButton onPress={() => navigation.openDrawer()} icon="ios-menu" />
                </Left>
                <Body>
                    <Title>{i18n.t('Settings')}</Title>
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
                            underlayColor="rgba(21, 15, 26, 0.35)"
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

export default connect(
    state => ({ settings: state.settings }),
    {}
)(Settings);
