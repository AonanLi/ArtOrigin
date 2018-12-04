import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { connect } from 'react-redux';
import { Root, StyleProvider } from 'native-base';
import i18n from 'i18n-js';
import _ from 'lodash';

import App from '../App';

import getTheme from '../theme/components';
import material from '../theme/variables/material';
import ui from '../data/ui';
import translations from '../data/translations';
import languages from '../data/languages';

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
        const { language, saveCardsets } = this.props;
        i18n.fallbacks = true;
        i18n.translations = translations;
        i18n.locale = _.find(languages, l => l.value === language).locale;

        saveCardsets();
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
            <Root>
                <StyleProvider style={getTheme(material)}>
                    <App />
                </StyleProvider>
            </Root>
        );
    }
}

export default connect(
    state => ({
        cards: state.cardsets.cards,
        loading: state.cardsets.loading,
        language: state.settings.language
    }),
    {
        saveCardsets
    }
)(Setup);
