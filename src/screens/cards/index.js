import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Left, Right, Body, Toast } from 'native-base';
import { Dimensions } from 'react-native';
import { DrawerActions } from 'react-navigation';
import _ from 'lodash';

import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';

import cardsSelector from '../../selectors/cardsSelector';
import isBigScreen from '../../utils/isBigScreen';

const margin = isBigScreen ? 128 : 0;

class Cards extends PureComponent {
    render() {
        const { cards, language, navigation } = this.props;
        const { navigate, dispatch, openDrawer } = navigation;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <IconButton
                            onPress={() => dispatch(DrawerActions.openDrawer())}
                            icon="ios-menu"
                        />
                    </Left>
                    <Body>
                        <Title>Cards</Title>
                    </Body>
                    <Right>
                        <IconButton onPress={() => openDrawer()} icon="ios-options" />
                    </Right>
                </Header>
                <CardList
                    cards={cards}
                    language={language}
                    navigate={navigate}
                    style={{
                        marginLeft: margin,
                        marginRight: margin,
                        height: Dimensions.get('window').height - 56
                    }}
                />
            </Container>
        );
    }
}

export default connect(
    cardsSelector,
    {}
)(Cards);
