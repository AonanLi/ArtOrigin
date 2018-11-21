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

import { editSetting } from '../../actions/settings';
import languages from '../../utils/languages';

const Settings = ({ navigation, settings, editSetting }) => {
    const { label, path, options } = navigation.state.params.s;
    const value = _.get(settings, path, '');
    return (
        <Container>
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
                <List style={{ paddingTop: 8 }}>
                    {options.filter(o => o.value !== '').map((o, i) => (
                        <ListItem
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
                </List>
            </Content>
        </Container>
    );
};

export default connect(
    state => ({ settings: state.settings }),
    { editSetting }
)(Settings);
