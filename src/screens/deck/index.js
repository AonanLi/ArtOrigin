import React from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, Dimensions, Clipboard } from 'react-native';
import { Container, Header, Title, Left, Right, Body, Toast, Text } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import Heroes from './Heroes';
import Background from '../../components/Background';
import AlertText from '../../components/AlertText';
import TypeCounter from '../../components/TypeCounter';
import CostCounter from '../../components/CostCounter';
import CardList from '../../components/CardList';
import IconButton from '../../components/IconButton';

import * as decks from '../../actions/decks';
import deckSelector from '../../selectors/deckSelector';
import ui from '../../data/ui';
import countCards from '../../utils/countCards';
import encode from '../../utils/encode';
import { deckLeftRight, deckBottom, deckListHeight, heroesWidth } from '../../utils/dimensions';

const Deck = ({
    current_deck,
    navigation,
    language,
    resetDeck,
    saveCurrentDeck,
    manageDeckCards,
    swapHeroes
}) => {
    const { navigate, dispatch, openDrawer } = navigation;
    const { heroes, cards, name } = current_deck;
    const hero_count = heroes.filter(h => h.id).length;
    const hero_text = i18n.t('Heroes', { hero_count });
    const partition = _.partition(cards, c => c.card_type === 'Item');
    const costs = _.times(8).map(i => {
        const cost = i + 1;
        const records = partition[1].filter(c =>
            cost === 8 ? c.mana_cost >= 8 : c.mana_cost === cost
        );
        return { cost, records };
    });
    const max_count = _.max(costs.map(c => countCards(c.records)));

    return (
        <Background>
            <Header hasTabs>
                <Left>
                    <IconButton onPress={() => openDrawer()} icon="ios-menu" />
                </Left>
                <Body>
                    <Title>{i18n.t('Deck')}</Title>
                </Body>
                <Right>
                    <IconButton
                        onPress={() => {
                            saveCurrentDeck();
                            Toast.show({
                                text: i18n.t('DeckSaved', { name })
                            });
                        }}
                        icon="ios-save"
                    />
                    <IconButton onPress={resetDeck} icon="md-refresh" />
                    <IconButton onPress={() => navigate('Import')} icon="ios-folder-open" />
                </Right>
            </Header>
            <ImageBackground source={ui.header} style={style.header}>
                <Text style={style.text}>{name}</Text>
                <IconButton
                    onPress={() => {
                        const code = encode(current_deck);
                        if (code) {
                            Clipboard.setString(code);
                            Toast.show({
                                text: i18n.t('DeckCodeCopiedToTheClipboard')
                            });
                        } else {
                            Toast.show({
                                text: i18n.t('FailedToGenerateDeckLink'),
                                type: 'danger'
                            });
                        }
                    }}
                    icon="ios-copy"
                    style={style.icon}
                    buttonStyle={style.copy}
                />
            </ImageBackground>
            <View style={style.view}>
                <AlertText
                    condition={hero_count !== 5}
                    text={hero_text}
                    align="flex-start"
                    style={style.alertText}
                />
                <View style={style.avatar}>
                    <Heroes
                        heroes={heroes}
                        navigate={navigate}
                        width={heroesWidth}
                        manageDeckCards={manageDeckCards}
                        swapHeroes={swapHeroes}
                    />
                </View>
                <View style={style.type}>
                    <TypeCounter cards cards={partition[1]} />
                    <TypeCounter item cards={partition[0]} />
                </View>
                <View style={style.cost}>
                    {costs.map(c => (
                        <CostCounter item={c} max={max_count} key={c.cost} />
                    ))}
                    <CostCounter item={{ cost: 'All', records: partition[1] }} />
                </View>
                <CardList
                    style={style.list}
                    cards={cards}
                    navigate={navigate}
                    language={language}
                    manageDeckCards={manageDeckCards}
                />
            </View>
        </Background>
    );
};

export default connect(
    deckSelector,
    decks
)(Deck);

const style = {
    header: {
        height: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        color: '#cad4ff',
        fontSize: 18
    },
    copy: { marginRight: 5, marginTop: -6 },
    alertText: {
        marginTop: 8,
        marginBottom: 4
    },
    text: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: deckLeftRight,
        marginRight: deckLeftRight
    },
    view: {
        marginLeft: deckLeftRight,
        marginRight: deckLeftRight
    },
    avatar: {
        marginBottom: deckBottom,
        zIndex: 1
    },
    type: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: deckBottom
    },
    cost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: deckBottom
    },
    list: {
        backgroundColor: '#150f19',
        height: deckListHeight
    }
};
