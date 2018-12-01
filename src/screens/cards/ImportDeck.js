import React, { Component } from 'react';
import { Header, Title, Button, Left, Right, Body, Text, ListItem, Item, Input } from 'native-base';
import { View, Modal, Clipboard, FlatList } from 'react-native';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';
import FullButton from '../../components/FullButton';

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
        const { visible, decks, setVisible, addDeckFromCode, activeDeck, removeDeck } = this.props;
        const { code, deckId } = this.state;
        return (
            <Modal animationType="slide" transparent={false} visible={visible}>
                <Background>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Select Deck</Title>
                        </Body>
                        <Right>
                            <IconButton
                                onPress={() => setVisible(false)}
                                icon="md-close-circle-outline"
                            />
                        </Right>
                    </Header>
                    <ListItem itemHeader noBorder>
                        <Text>From Deck Link</Text>
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
                            addDeckFromCode(code);
                            setVisible(false);
                        }}
                        disabled={code.length < 60}
                        text="Import"
                    />
                    <ListItem itemHeader noBorder>
                        <Text>From Saved Decks</Text>
                    </ListItem>
                    <View style={style.view}>
                        <FlatList
                            data={_.map(decks, d => ({ key: d.id, ...d }))}
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
                                        <Body style>
                                            <Text>{name}</Text>
                                        </Body>
                                        <Right>
                                            <IconButton
                                                onPress={() => {
                                                    removeDeck(id);
                                                    if (selected) {
                                                        this.setState({ deckId: undefined });
                                                    }
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
                            setVisible(false);
                        }}
                        disabled={!deckId}
                        style={style.select}
                        text="Select"
                    />
                </Background>
            </Modal>
        );
    }
}

export default ImportDeck;

const style = {
    icon: { color: '#cad4ff' },
    select: { marginTop: 16 },
    view: { marginLeft: 20, marginRight: 20, backgroundColor: '#150f19', height: 300 }
};
