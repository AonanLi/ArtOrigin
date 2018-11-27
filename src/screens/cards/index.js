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
import { FlatList } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';

import cardsSelector from './cardsSelector';
import { ui } from '../../data/ui';
import defaultGet from '../../utils/defaultGet';

class Cards extends PureComponent {
    render() {
        const { cards, language, navigation } = this.props;
        const { navigate } = navigation;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigate('DrawerOpen')}>
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Cards</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => navigate('Filter')}>
                            <Icon name="ios-options" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <FlatList
                        style={{ padding: 8 }}
                        data={cards}
                        renderItem={({ item }) => (
                            <ListItem item={item} language={language} navigate={navigate} />
                        )}
                        getItemLayout={(data, index) => ({ length: 45, offset: 45 * index, index })}
                    />
                </Content>
            </Container>
        );
    }
}

export default connect(cardsSelector, {})(Cards);
