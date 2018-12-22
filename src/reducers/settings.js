import storage from 'redux-persist/lib/storage';

import { defaultLocale } from '../utils/locale';

const reducers = {
    EDIT_SETTING: editSetting
};

const persistConfig = {
    key: 'settings',
    storage: storage,
    blacklist: []
};

const defaultState = { language: defaultLocale };

export default { reducers, defaultState, persistConfig };

function editSetting(state, { path, value }) {
    return { ...state, [path]: value };
}
