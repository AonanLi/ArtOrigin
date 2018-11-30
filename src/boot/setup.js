import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { connect } from 'react-redux';
import { StyleProvider } from 'native-base';
import _ from 'lodash';

import App from '../App';

import getTheme from '../theme/components';
import material from '../theme/variables/material';
import ui from '../data/ui';

import { saveCardsets } from '../actions/cardsets';

const cacheImages = images =>
    images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    componentDidMount() {
        const { cards, saveCardsets } = this.props;
        if (!cards) {
            this.props.saveCardsets();
        }
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages(_.toArray(ui));
        const fontAssets = cacheFonts([
            {
                Roboto: require('native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
            }
        ]);
        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (this.props.loading || !this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return (
            <StyleProvider style={getTheme(material)}>
                <App />
            </StyleProvider>
        );
    }
}

export default connect(
    state => ({ cards: state.cardsets.cards, loading: state.cardsets.loading }),
    {
        saveCardsets
    }
)(Setup);
