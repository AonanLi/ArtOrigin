import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Left, Right, Body, Toast } from 'native-base';
import { Dimensions } from 'react-native';
import _ from 'lodash';

import ImportDeck from './ImportDeck';
import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';

import cardsSelector from '../../selectors/cardsSelector';
import isBigScreen from '../../utils/isBigScreen';
import * as decks from '../../actions/decks';

const margin = isBigScreen ? 128 : 0;

class Cards extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { tab: 0, visible: false };
    }

    setVisible = visible => this.setState({ visible });

    render() {
        const { cards, current_deck, language, decks, navigation, ...passProps } = this.props;
        const { navigate } = navigation;
        const { tab, visible } = this.state;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <IconButton onPress={() => navigate('DrawerOpen')} icon="ios-menu" />
                    </Left>
                    <Body>
                        <Title>Cards</Title>
                    </Body>
                    <Right>
                        <IconButton onPress={() => navigate('Filter')} icon="ios-options" />
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
                <ImportDeck
                    visible={visible}
                    decks={decks}
                    setVisible={this.setVisible}
                    {...passProps}
                />
            </Container>
        );
    }
}

export default connect(cardsSelector, decks)(Cards);
