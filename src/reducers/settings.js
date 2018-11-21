import _ from 'lodash';

const reducers = {
    EDIT_SETTING: editSetting
};
const defaultState = { language: 'english' };

export default { reducers, defaultState };

function editSetting(state, { path, value }) {
    return { ...state, [path]: value };
}
