import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Text,
    ListItem,
    Item,
    Input,
    Toast
} from 'native-base';
import { View, Clipboard, FlatList } from 'react-native';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';
import FullButton from '../../components/FullButton';

import * as decks from '../../actions/decks';
import decode from '../../utils/decode';

class ImportDeck extends Component {
    constructor(props) {
        super(props);
        this.state = { code: '', deckId: undefined };
    }

    async _getContent() {
        var content = await Clipboard.getString();
        this.setState({ code: content });
    }

    render() {
        const { navigation, saved_decks, addDeck, activeDeck, removeDeck } = this.props;
        const { goBack } = navigation;
        const { code, deckId } = this.state;
        return (
            <Background>
                <Header>
                    <Left>
                        <IconButton onPress={() => goBack()} icon="arrow-back" />
                    </Left>
                    <Body>
                        <Title>Select Deck</Title>
                    </Body>
                </Header>
                <ListItem itemHeader noBorder>
                    <Text>From Deck Code</Text>
                </ListItem>
                <ListItem noBorder>
                    <Item>
                        <Input
                            placeholder="Paste Deck Code →"
                            value={code}
                            onChangeText={text => this.setState({ code: text })}
                        />
                        <IconButton
                            onPress={() => this._getContent()}
                            icon="ios-clipboard"
                            style={style.icon}
                        />
                    </Item>
                </ListItem>
                <FullButton
                    onPress={() => {
                        const deck = decode(code);
                        if (deck) {
                            addDeck(deck);
                            this.setState({ code: '' });
                            goBack();
                            Toast.show({
                                text: 'Imported deck from code'
                            });
                        } else {
                            Toast.show({
                                text: 'Deck code is invalid',
                                type: 'danger'
                            });
                        }
                    }}
                    disabled={code.length === 0}
                    text="Import"
                />
                <ListItem itemHeader noBorder>
                    <Text>From Saved Decks</Text>
                </ListItem>
                <View style={style.view}>
                    <FlatList
                        data={_.map(saved_decks, d => ({ key: d.id, ...d }))}
                        renderItem={({ item }) => {
                            const { id, name } = item;
                            const selected = id === deckId;
                            return (
                                <ListItem
                                    key={id}
                                    selected={selected}
                                    onPress={() =>
                                        this.setState({ deckId: selected ? undefined : id })
                                    }
                                    underlayColor="#150f19"
                                >
                                    <Body>
                                        <Text>{name}</Text>
                                    </Body>
                                    <Right>
                                        <IconButton
                                            onPress={() => {
                                                removeDeck(id);
                                                if (selected) {
                                                    this.setState({ deckId: undefined });
                                                }
                                                Toast.show({
                                                    text: `Deck Deleted: ${name}`
                                                });
                                            }}
                                            icon="ios-trash"
                                            style={style.icon}
                                        />
                                    </Right>
                                </ListItem>
                            );
                        }}
                    />
                </View>
                <FullButton
                    onPress={() => {
                        activeDeck(deckId);
                        goBack();
                    }}
                    disabled={!deckId}
                    style={style.select}
                    text="Select"
                />
            </Background>
        );
    }
}

export default connect(state => ({ saved_decks: state.decks.decks }), decks)(ImportDeck);

const style = {
    icon: { color: '#cad4ff' },
    select: { marginTop: 16 },
    view: { marginLeft: 20, marginRight: 20, backgroundColor: '#150f19', height: 300 }
};
