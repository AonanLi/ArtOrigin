import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Content, Icon, Left, Right, Body, ListItem, Text } from 'native-base';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';

import { editSetting } from '../../actions/settings';

const Settings = ({ navigation, settings, editSetting }) => {
    const { label, path, options } = navigation.state.params.s;
    const value = _.get(settings, path, '');
    return (
        <Background>
            <Header>
                <Left>
                    <IconButton onPress={() => navigation.goBack()} icon="arrow-back" />
                </Left>
                <Body>
                    <Title>{label}</Title>
                </Body>
            </Header>
            <Content style={{ paddingTop: 8 }}>
                {options
                    .filter(o => o.value !== '')
                    .map((o, i) => (
                        <ListItem
                            underlayColor="#150f19"
                            key={i}
                            selected={o.value === value}
                            onPress={() => editSetting(path, o.value)}
                        >
                            <Body>
                                <Text>{o.label}</Text>
                            </Body>
                            <Right>
                                <Icon active name="arrow-forward" />
                            </Right>
                        </ListItem>
                    ))}
            </Content>
        </Background>
    );
};

export default connect(
    state => ({ settings: state.settings }),
    { editSetting }
)(Settings);
