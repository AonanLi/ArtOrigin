import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Left, Right, Body, Toast } from 'native-base';
import { Dimensions } from 'react-native';
import { DrawerActions } from 'react-navigation';
import _ from 'lodash';

import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';

import * as decks from '../../actions/decks';
import cardsSelector from '../../selectors/cardsSelector';
import isBigScreen from '../../utils/isBigScreen';

const margin = isBigScreen ? 128 : 0;

class Cards extends PureComponent {
    render() {
        const { cards, navigation, ...passProps } = this.props;
        const { navigate, dispatch, openDrawer } = navigation;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <IconButton onPress={() => openDrawer()} icon="ios-menu" />
                    </Left>
                    <Body>
                        <Title>Cards</Title>
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
                        height: Dimensions.get('window').height - 56
                    }}
                    navigate={navigate}
                    {...passProps}
                />
            </Container>
        );
    }
}

export default connect(
    cardsSelector,
    decks
)(Cards);
