import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Header, Title, Left, Right, Body, Toast } from 'native-base';
import { DrawerActions } from 'react-navigation';
import i18n from 'i18n-js';
import _ from 'lodash';

import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';
import Background from '../../components/Background';

import * as decks from '../../actions/decks';
import cardsSelector from '../../selectors/cardsSelector';
import isBigScreen from '../../utils/isBigScreen';
import statusbar from '../../utils/statusbar';

const margin = isBigScreen ? 128 : 0;

class Cards extends PureComponent {
    render() {
        const { cards, navigation, ...passProps } = this.props;
        const { navigate, dispatch, openDrawer } = navigation;
        return (
            <Background>
                <Header hasTabs>
                    <Left>
                        <IconButton onPress={() => openDrawer()} icon="ios-menu" />
                    </Left>
                    <Body>
                        <Title>{i18n.t('Cards')}</Title>
                    </Body>
                    <Right>
                        <IconButton
                            onPress={() => dispatch(DrawerActions.openDrawer())}
                            icon="ios-options"
                        />
                    </Right>
                </Header>
                <CardList
                    cards={cards}
                    style={{
                        marginLeft: margin,
                        marginRight: margin,
                        height: Dimensions.get('window').height - 56 - statusbar
                    }}
                    navigate={navigate}
                    {...passProps}
                />
            </Background>
        );
    }
}

export default connect(
    cardsSelector,
    decks
)(Cards);
