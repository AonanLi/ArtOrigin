import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Header, Title, Left, Right, Body, Toast } from 'native-base';
import { DrawerActions } from 'react-navigation';
import i18n from 'i18n-js';
import _ from 'lodash';

import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';
import Background from '../../components/Background';

import { manageDeckCards } from '../../actions/decks';
import cardsSelector from '../../selectors/cardsSelector';
import { cardsMargin, listHeight } from '../../utils/dimensions';

class Cards extends PureComponent {
    render() {
        const { navigation, cards, language, has5Heroes, manageDeckCards } = this.props;
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
                        marginLeft: cardsMargin,
                        marginRight: cardsMargin,
                        height: listHeight
                    }}
                    navigate={navigate}
                    language={language}
                    has5Heroes={has5Heroes}
                    manageDeckCards={manageDeckCards}
                />
            </Background>
        );
    }
}

export default connect(
    cardsSelector,
    { manageDeckCards }
)(Cards);
