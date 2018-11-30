import React, { Component } from 'react';
import {
    Header,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
    ListItem,
    Item,
    Input
} from 'native-base';
import { View, Modal, Clipboard, FlatList } from 'react-native';
import _ from 'lodash';

import Background from '../../components/Background';

class DeckSelector extends Component {
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
                            <Button transparent onPress={() => setVisible(false)}>
                                <Icon name="md-close-circle-outline" />
                            </Button>
                        </Right>
                    </Header>
                    <ListItem itemHeader noBorder>
                        <Text>From Code</Text>
                    </ListItem>
                    <ListItem noBorder>
                        <Item>
                            <Input
                                placeholder="Click to Paste Deck Code"
                                value={code}
                                onChangeText={text => this.setState({ code: text })}
                            />
                            <Button transparent onPress={() => this._getContent()}>
                                <Icon name="ios-copy" style={style.paste} />
                            </Button>
                        </Item>
                    </ListItem>
                    <Button
                        full
                        warning
                        onPress={() => {
                            addDeckFromCode(
                                'ADCJWkTZX05uwGDCRV4XQGy3QGLmqUBg4GQJgGLGgO7AaABR3JlZW4vQmxhY2sgRXhhbXBsZQ__' //hardcode for now
                            );
                            setVisible(false);
                        }}
                        disabled={code.length < 60}
                        style={style.import}
                    >
                        <Text style={style.text}>Import</Text>
                    </Button>
                    <ListItem itemHeader noBorder>
                        <Text>From Saved Decks</Text>
                    </ListItem>
                    <View style={style.view}>
                        <FlatList
                            data={_.map(decks, d => ({ key: d.id, ...d }))}
                            renderItem={({ item }) => (
                                <ListItem
                                    key={item.id}
                                    selected={item.id === deckId}
                                    onPress={() => this.setState({ deckId: item.id })}
                                    underlayColor="#150f19"
                                >
                                    <Body>
                                        <Text>{item.name}</Text>
                                    </Body>
                                    <Right>
                                        <Button onPress={() => removeDeck(item.id)}>
                                            <Icon name="ios-trash" />
                                        </Button>
                                    </Right>
                                </ListItem>
                            )}
                        />
                    </View>
                    <Button
                        full
                        warning
                        onPress={() => {
                            activeDeck(deckId);
                            setVisible(false);
                        }}
                        disabled={!deckId}
                        style={style.select}
                    >
                        <Text style={style.text}>Select</Text>
                    </Button>
                </Background>
            </Modal>
        );
    }
}

export default DeckSelector;

const style = {
    paste: { color: '#cad4ff' },
    import: { marginLeft: 20, marginRight: 20 },
    select: { marginLeft: 20, marginRight: 20, marginTop: 16 },
    view: { marginLeft: 20, marginRight: 20, backgroundColor: '#150f19', height: 300 },
    text: { color: 'black' }
};
