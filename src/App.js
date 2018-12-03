import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation';

import SideBar from './screens/sidebar';
import Filter from './screens/filter';
import Cards from './screens/cards';
import Card from './screens/card';
import Settings from './screens/settings';
import Setting from './screens/setting';
import Deck from './screens/deck';
import Import from './screens/import';

const AppNavigator = createStackNavigator(
    {
        Cards: { screen: Cards },
        Card: { screen: Card }
    },
    {
        initialRouteName: 'Cards',
        headerMode: 'none'
    }
);

AppNavigator.navigationOptions = ({ navigation }) => ({
    swipeEnabled: navigation.state.index === 0,
    tabBarVisible: false
});

const DeckNavigator = createStackNavigator(
    {
        Deck: { screen: Deck },
        Card: { screen: Card },
        Import: { screen: Import }
    },
    {
        initialRouteName: 'Deck',
        headerMode: 'none',
        navigationOptions: {
            tabBarVisible: false
        }
    }
);

const SettingsNavigator = createStackNavigator(
    {
        Settings: { screen: Settings },
        Setting: { screen: Setting }
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'none'
    }
);

const Tab = createMaterialTopTabNavigator(
    {
        App: { screen: AppNavigator },
        DeckApp: { screen: DeckNavigator }
    },
    {
        swipeEnabled: true,
        lazy: false,
        navigationOptions: {
            tabBarVisible: false
        }
    }
);

const RightDrawer = createDrawerNavigator(
    {
        Set: SettingsNavigator,
        Tab: Tab
    },
    {
        initialRouteName: 'Tab',
        drawerPosition: 'right',
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <Filter {...props} />
    }
);

const Drawer = createDrawerNavigator(
    {
        RightDrawer: { screen: RightDrawer }
    },
    {
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <SideBar {...props} />
    }
);

export default createAppContainer(Drawer);
