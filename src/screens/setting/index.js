import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    View,
    ListItem,
    Text
} from 'native-base';
import _ from 'lodash';

import Background from '../../components/Background';

import { editSetting } from '../../actions/settings';
import languages from '../../utils/languages';

const Settings = ({ navigation, settings, editSetting }) => {
    const { label, path, options } = navigation.state.params.s;
    const value = _.get(settings, path, '');
    return (
        <Background path="sidebar">
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{label}</Title>
                </Body>
            </Header>
            <Content>
                <View style={{ paddingTop: 8 }}>
                    {options.filter(o => o.value !== '').map((o, i) => (
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
                </View>
            </Content>
        </Background>
    );
};

export default connect(
    state => ({ settings: state.settings }),
    { editSetting }
)(Settings);
