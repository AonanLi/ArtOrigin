import React, { PureComponent } from 'react';
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
    Tab,
    Tabs
} from 'native-base';
import { FlatList, View } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';
import Deck from './Deck';

import cardsSelector from './cardsSelector';
import { ui } from '../../data/ui';
import defaultGet from '../../utils/defaultGet';

const tabs = ['Cards', 'Deck'];

class Cards extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { tab: 0 };
    }

    render() {
        const { cards, language, navigation } = this.props;
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
                        <FlatList
                            style={{ padding: 8 }}
                            data={cards}
                            renderItem={({ item }) => (
                                <ListItem item={item} language={language} navigate={navigate} />
                            )}
                            getItemLayout={(data, index) => ({
                                length: 45,
                                offset: 45 * index,
                                index
                            })}
                        />
                    </Tab>
                    <Tab heading="Deck">
                        <Deck />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default connect(cardsSelector, {})(Cards);
