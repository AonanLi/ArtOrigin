import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Button, Icon, Left, Right, Body, Tab, Tabs } from 'native-base';
import { View } from 'react-native';
import _ from 'lodash';

import Deck from './Deck';
import CardList from '../../components/CardList';

import cardsSelector from './cardsSelector';
import isBigScreen from '../../utils/isBigScreen';

const margin = isBigScreen ? 128 : 0;
const tabs = ['Cards', 'Deck'];

class Cards extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { tab: 0 };
    }

    render() {
        const { deck, cards, language, navigation } = this.props;
        const { navigate } = navigation;
        return (
            <Container>
                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => navigate('DrawerOpen')}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{tabs[this.state.tab]}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigate('Filter')}>
                            <Icon name="ios-options" />
                        </Button>
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
                        <Deck deck={deck} language={language} navigate={navigate} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default connect(
    cardsSelector,
    {}
)(Cards);
