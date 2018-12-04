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
        headerMode: 'none'
    }
);

DeckNavigator.navigationOptions = ({ navigation }) => ({
    swipeEnabled: navigation.state.index === 0,
    tabBarVisible: false
});

const SettingsNavigator = createStackNavigator(
    {
        Settings: { screen: Settings },
        Setting: { screen: Setting }
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'none',
        navigationOptions: { drawerLockMode: 'locked-closed' }
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
            tabBarVisible: false,
            drawerLockMode: 'locked-closed'
        }
    }
);

const SideDrawer = createDrawerNavigator(
    {
        Set: SettingsNavigator,
        Tab: Tab
    },
    {
        initialRouteName: 'Tab',
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <SideBar {...props} />
    }
);

const Drawer = createDrawerNavigator(
    {
        SideDrawer: { screen: SideDrawer }
    },
    {
        drawerPosition: 'right',
        contentComponent: props => <Filter {...props} />
    }
);

export default createAppContainer(Drawer);
