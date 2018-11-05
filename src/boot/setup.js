import { AppLoading, Asset, Font } from 'expo';
import React, { Component } from 'react';
import { StyleProvider } from 'native-base';

import App from '../App';

import getTheme from '../theme/components';
import material from '../theme/variables/material';
import cards from '../data/cards';
import ui from '../data/ui';

const cacheImages = images =>
    images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

export default class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    async _loadAssetsAsync() {
        const imageAssets = cacheImages(cards.concat(ui));
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
        if (!this.state.isReady) {
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
