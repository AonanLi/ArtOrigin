import { Dimensions } from 'react-native';

const isBigScreen = Dimensions.get('window').width > 700;

export default isBigScreen;
