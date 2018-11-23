import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Content, Text, Button, Icon, Left, Body } from 'native-base';
import _ from 'lodash';

import Background from '../../components/Background';
import FullWidthImage from './FullWidthImage';
import References from './References';

import defaultGet from '../../utils/defaultGet';

const Card = ({ navigation, language, refs }) => {
    const { card_name, large_image } = navigation.state.params.item;
    return (
        <Background>
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{defaultGet(card_name, language, 'english')}</Title>
                </Body>
            </Header>
            <Content>
                <FullWidthImage uri={defaultGet(large_image, language, 'default')} />
                <References refs={refs} language={language} />
            </Content>
        </Background>
    );
};

const getRefs = (item, refs, origin) =>
    item.references.map(r => {
        if (r.card_id === origin.card_id) {
            return origin;
        }
        const ref = refs[r.card_id];
        if (ref) {
            return ref;
        }
        return false;
    });

export default connect((state, props) => {
    const { item } = props.navigation.state.params;
    const { refs } = state.cardsets;

    const first = getRefs(item, refs, item);
    const second = _.flatten(first.map(i => getRefs(i, refs, item)));
    const combine = _.uniq(_.compact(first.concat(second)));
    return {
        refs: combine,
        language: state.settings.language
    };
}, {})(Card);
