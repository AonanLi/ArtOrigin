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
                                <Icon name="ios-close-circle-outline" style={style.close} />
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
                        onPress={() =>
                            addDeckFromCode(
                                'ADCJWkTZX05uwGDCRV4XQGy3QGLmqUBg4GQJgGLGgO7AaABR3JlZW4vQmxhY2sgRXhhbXBsZQ__' //hardcode for now
                            )
                        }
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
                            data={_.map(decks, (d, id) => ({ key: id, ...d }))}
                            renderItem={({ item }) => {
                                const id = item.key;
                                return (
                                    <ListItem
                                        key={id}
                                        selected={id === deckId}
                                        onPress={() => this.setState({ deckId: id })}
                                        underlayColor="#150f19"
                                    >
                                        <Body>
                                            <Text>{item.name}</Text>
                                        </Body>
                                        <Right>
                                            <Button onPress={() => removeDeck(id)}>
                                                <Icon name="ios-trash" />
                                            </Button>
                                        </Right>
                                    </ListItem>
                                );
                            }}
                        />
                    </View>
                    <Button
                        full
                        warning
                        onPress={() => activeDeck(deckId)}
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
    close: { fontSize: 22 },
    paste: { color: '#cad4ff' },
    import: { marginLeft: 20, marginRight: 20 },
    select: { marginLeft: 20, marginRight: 20, marginTop: 16 },
    view: { marginLeft: 20, marginRight: 20, backgroundColor: '#150f19', height: 300 },
    text: { color: 'black' }
};
