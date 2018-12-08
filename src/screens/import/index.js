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
import i18n from 'i18n-js';
import _ from 'lodash';

import Background from '../../components/Background';
import IconButton from '../../components/IconButton';
import FullButton from '../../components/FullButton';

import * as decks from '../../actions/decks';
import decode from '../../utils/decode';
import { importListHeight } from '../../utils/dimensions';

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
                        <Title>{i18n.t('SelectDeck')}</Title>
                    </Body>
                </Header>
                <ListItem itemHeader noBorder>
                    <Text>{i18n.t('FromDeckCode')}</Text>
                </ListItem>
                <ListItem noBorder>
                    <Item>
                        <Input
                            placeholder={i18n.t('PasteDeckCode')}
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
                                text: i18n.t('Imported deck from code')
                            });
                        } else {
                            Toast.show({
                                text: i18n.t('DeckCodeIsInvalid'),
                                type: 'danger'
                            });
                        }
                    }}
                    disabled={code.length === 0}
                    text={i18n.t('Import')}
                />
                <ListItem itemHeader noBorder>
                    <Text>{i18n.t('FromSavedDecks')}</Text>
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
                                                    text: i18n.t('DeckDeleted', { name })
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
                    text={i18n.t('Select')}
                />
            </Background>
        );
    }
}

export default connect(
    state => ({ saved_decks: state.decks.decks }),
    decks
)(ImportDeck);

const style = {
    icon: { color: '#cad4ff' },
    select: { marginTop: 16 },
    view: { marginLeft: 20, marginRight: 20, backgroundColor: '#150f19', height: importListHeight }
};
