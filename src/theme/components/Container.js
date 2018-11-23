import { Platform, Dimensions } from 'react-native';

import variable from './../variables/material';

const deviceHeight = Dimensions.get('window').height;
export default (variables = variable) => {
    const theme = {
        flex: 1,
        height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - 20,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    };

    return theme;
};
