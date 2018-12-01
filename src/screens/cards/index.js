import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Left, Right, Body, Tab, Tabs } from 'native-base';
import { View } from 'react-native';
import _ from 'lodash';

import Deck from './Deck';
import ImportDeck from './ImportDeck';
import CardList from '../../components/CardList';
import ShowIf from '../../components/ShowIf';
import IconButton from '../../components/IconButton';

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
            saveCurrentDeck,
            ...passProps
        } = this.props;
        const { navigate } = navigation;
        const { tab, visible } = this.state;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <IconButton onPress={() => navigate('DrawerOpen')} icon="ios-menu" />
                    </Left>
                    <Body>
                        <Title>{tabs[tab]}</Title>
                    </Body>
                    <Right>
                        <ShowIf condition={tab}>
                            <IconButton onPress={() => saveCurrentDeck()} icon="ios-save" />
                        </ShowIf>
                        <ShowIf condition={tab}>
                            <IconButton onPress={resetDeck} icon="md-refresh" />
                        </ShowIf>
                        <ShowIf condition={tab}>
                            <IconButton
                                onPress={() => this.setVisible(true)}
                                icon="ios-folder-open"
                            />
                        </ShowIf>
                        <ShowIf condition={!tab}>
                            <IconButton onPress={() => navigate('Filter')} icon="ios-options" />
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

export default connect(cardsSelector, { ...decks })(Cards);
