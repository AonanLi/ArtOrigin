import { Localization } from 'expo-localization';
import i18n from 'i18n-js';
import _ from 'lodash';

import languages from '../data/languages';

export const setLocale = value => {
    let locale = 'en';
    const item = _.find(languages, l => l.value === value);
    if (item) {
        locale = item.locale;
    }
    i18n.locale = locale;
};

export const defaultLocale = _.get(
    _.find(languages, l => l.locale === Localization.locale.slice(0, 2)),
    'value',
    'english'
);
