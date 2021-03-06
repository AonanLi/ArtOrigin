import color from 'color';

import { Platform, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = 'material';
const radio = (deviceHeight / deviceWidth).toFixed(3);
const isIphoneX = platform === 'ios' && (radio === '2.165' || radio === '2.164');

export default {
    platformStyle,
    platform,

    // Android
    androidRipple: true,
    androidRippleColor: 'rgba(256, 256, 256, 0.3)',
    androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
    btnUppercaseAndroidText: true,

    // Badge
    badgeBg: '#ED1727',
    badgeColor: '#cad4ff',
    badgePadding: 0,

    // Button
    btnFontFamily: 'Roboto',
    btnDisabledBg: '#b5b5b5',
    buttonPadding: 6,
    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: '#cad4ff',
    cardBorderColor: '#ccc',

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: 5,
    CheckboxIconSize: 16,
    CheckboxIconMarginTop: 1,
    CheckboxFontSize: 17,
    DefaultFontSize: 17,
    checkboxBgColor: '#039BE5',
    checkboxSize: 20,
    checkboxTickColor: '#cad4ff',

    // Color
    brandPrimary: '#150f19',
    brandInfo: '#62B1F6',
    brandSuccess: '#5cb85c',
    brandDanger: '#d9534f',
    brandWarning: '#ae9f84',
    brandDark: '#000',
    brandLight: '#cad4ff',

    // Font
    fontFamily: 'Roboto',
    fontSizeBase: 15,
    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    // Footer
    footerHeight: isIphoneX ? 89 : 55,
    footerDefaultBg: '#150f19',
    footerPaddingBottom: isIphoneX ? 34 : 0,

    // FooterTab
    tabBarTextColor: '#bfc6ea',
    tabBarTextSize: 11,
    activeTab: '#cad4ff',
    sTabBarActiveTextColor: '#007aff',
    tabBarActiveTextColor: '#cad4ff',
    tabActiveBgColor: '#150f19',

    // Header
    toolbarBtnColor: '#ae9f84',
    toolbarDefaultBg: '#150f19',
    toolbarHeight: 56,
    toolbarSearchIconSize: 23,
    toolbarInputColor: '#ae9f84',
    searchBarHeight: platform === 'ios' ? 30 : 40,
    searchBarInputHeight: platform === 'ios' ? 40 : 50,
    toolbarBtnTextColor: '#ae9f84',
    toolbarDefaultBorder: '#150f19',
    iosStatusbar: 'light-content',
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },
    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: 28,
    iconHeaderSize: 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: '#D9D5DC',
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: 50,
    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return '#575757';
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    lineHeight: 24,

    // List
    listBg: 'transparent',
    listBorderColor: '#150f19',
    listDividerBg: '#f4f4f4',
    listBtnUnderlayColor: '#DDD',
    listItemPadding: 12,
    listNoteColor: '#8d8e8d',
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: '#E4202D',
    inverseProgressColor: '#1A191B',

    // Radio Button
    radioBtnSize: 23,
    radioSelectedColorAndroid: '#150f19',
    radioBtnLineHeight: 24,
    get radioColor() {
        return this.brandPrimary;
    },

    // Segment
    segmentBackgroundColor: '#150f19',
    segmentActiveBackgroundColor: '#cad4ff',
    segmentTextColor: '#cad4ff',
    segmentActiveTextColor: '#150f19',
    segmentBorderColor: '#cad4ff',
    segmentBorderColorMain: '#150f19',

    // Spinner
    defaultSpinnerColor: '#45D56E',
    inverseSpinnerColor: '#1A191B',

    // Tab
    tabDefaultBg: '#150f19',
    topTabBarTextColor: '#b3c7f9',
    topTabBarActiveTextColor: '#cad4ff',
    topTabBarBorderColor: '#cad4ff',
    topTabBarActiveBorderColor: '#cad4ff',

    // Tabs
    tabBgColor: '#F8F8F8',
    tabFontSize: 15,

    // Text
    textColor: '#cad4ff',
    inverseTextColor: '#cad4ff',
    noteFontSize: 14,
    get defaultTextColor() {
        return this.textColor;
    },

    // Title
    titleFontfamily: 'Roboto',
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: '#cad4ff',
    titleFontColor: '#ae9f84',

    // Other
    borderRadiusBase: 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,
    dropdownLinkColor: '#414142',
    inputLineHeight: 24,
    deviceWidth,
    deviceHeight,
    isIphoneX,
    inputGroupRoundedBorderRadius: 30
};
