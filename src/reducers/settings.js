import { Localization } from 'expo-localization';
import _ from 'lodash';

import languages from '../data/languages';

const defaultLocale = Localization.locale;

const item = _.find(languages, l => l.locale === defaultLocale.slice(0, 2));

const reducers = {
    EDIT_SETTING: editSetting
};

const defaultState = { language: item ? item.value : 'english' };

export default { reducers, defaultState };

function editSetting(state, { path, value }) {
    return { ...state, [path]: value };
}
