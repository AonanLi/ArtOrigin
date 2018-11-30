import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Button, Icon, Left, Right, Body, Tab, Tabs } from 'native-base';
import { View } from 'react-native';
import _ from 'lodash';

import Deck from './Deck';
import DeckSelector from './DeckSelector';
import CardList from '../../components/CardList';
import ShowIf from '../../components/ShowIf';

import cardsSelector from './cardsSelector';
import isBigScreen from '../../utils/isBigScreen';
import * as decks from '../../actions/decks';

const margin = isBigScreen ? 128 : 0;
const tabs = ['Cards', 'Deck'];

class Cards extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { tab: 0, visible: false };
    }

    setVisible = visible => this.setState({ visible });

    render() {
        const {
            cards,
            current_deck,
            language,
            decks,
            navigation,
            resetDeck,
            ...passProps
        } = this.props;
        const { navigate } = navigation;
        const { tab, visible } = this.state;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => navigate('DrawerOpen')}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{tabs[tab]}</Title>
                    </Body>
                    <Right>
                        <ShowIf condition={tab}>
                            <Button transparent onPress={resetDeck}>
                                <Icon name="md-refresh" />
                            </Button>
                        </ShowIf>
                        <ShowIf condition={tab}>
                            <Button transparent onPress={() => this.setVisible(true)}>
                                <Icon name="ios-folder-open" />
                            </Button>
                        </ShowIf>
                        <ShowIf condition={!tab}>
                            <Button transparent onPress={() => navigate('Filter')}>
                                <Icon name="ios-options" />
                            </Button>
                        </ShowIf>
                    </Right>
                </Header>
                <Tabs
                    onChangeTab={({ i }) => this.setState({ tab: i })}
                    renderTabBar={() => <View />}
                    prerenderingSiblingsNumber={1}
                >
                    <Tab heading="Cards">
                        <CardList
                            cards={cards}
                            language={language}
                            navigate={navigate}
                            style={{ marginLeft: margin, marginRight: margin }}
                        />
                    </Tab>
                    <Tab heading="Deck">
                        <Deck current_deck={current_deck} language={language} navigate={navigate} />
                    </Tab>
                </Tabs>
                <DeckSelector
                    visible={visible}
                    decks={decks}
                    setVisible={this.setVisible}
                    {...passProps}
                />
            </Container>
        );
    }
}

export default connect(
    cardsSelector,
    { ...decks }
)(Cards);
