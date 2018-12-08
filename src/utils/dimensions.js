import { Dimensions } from 'react-native';
import { Constants } from 'expo';

const statusbar = Constants.statusBarHeight || 20;
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
const isLarge = windowWidth > 700;
export const isSmall = windowWidth < 350;

//FullWidthImage
const cardMargin = isLarge ? 128 : 18;
export const cardWidth = windowWidth - 2 * cardMargin;
export const cardHeight = 1.69 * cardWidth;

//Cards
export const cardsMargin = isLarge ? 128 : 0;
export const listHeight = windowHeight - 56 - statusbar;

//Deck
export const deckLeftRight = isLarge ? 128 : isSmall ? 4 : 16;
export const deckBottom = isLarge ? 16 : isSmall ? 4 : 12;
export const deckListHeight = windowHeight - 3 * deckBottom - 325 - statusbar;
export const heroesWidth = windowWidth - 2 * deckLeftRight;
export const costWidth = isLarge ? 40 : isSmall ? 20 : 28;

//Import
export const importListHeight = isSmall ? 200 : 300;
