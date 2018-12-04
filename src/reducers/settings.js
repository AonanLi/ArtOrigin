import { defaultLocale } from '../utils/locale';

const reducers = {
    EDIT_SETTING: editSetting
};

const defaultState = { language: defaultLocale };

export default { reducers, defaultState };

function editSetting(state, { path, value }) {
    return { ...state, [path]: value };
}
