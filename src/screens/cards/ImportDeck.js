import React, { Component } from 'react';
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
import { View, Modal, Clipboard, FlatList } from 'react-native';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';
import FullButton from '../../components/FullButton';
import ModalToast from '../../components/ModalToast';

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
        const { visible, decks, setVisible, addDeck, activeDeck, removeDeck } = this.props;
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
                                setVisible(false);
                                Toast.show({
                                    text: 'Imported deck from code'
                                });
                            } else {
                                ModalToast.show({
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
                                                    ModalToast.show({
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
                            setVisible(false);
                        }}
                        disabled={!deckId}
                        style={style.select}
                        text="Select"
                    />
                    <ModalToast
                        ref={c => {
                            if (c) ModalToast.toastInstance = c;
                        }}
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
