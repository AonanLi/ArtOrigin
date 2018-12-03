import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';

import SideBar from './screens/sidebar';
import Filter from './screens/filter';
import Cards from './screens/cards';
import Card from './screens/card';
import Settings from './screens/settings';
import Setting from './screens/setting';
import Deck from './screens/deck';
import Import from './screens/import';

const AppNavigator = StackNavigator(
    {
        Cards: { screen: Cards },
        Card: { screen: Card }
    },
    {
        initialRouteName: 'Cards',
        headerMode: 'none'
    }
);

const DeckNavigator = StackNavigator(
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

const SettingsNavigator = StackNavigator(
    {
        Settings: { screen: Settings },
        Setting: { screen: Setting }
    },
    {
        initialRouteName: 'Settings',
        headerMode: 'none'
    }
);

const Tab = TabNavigator(
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

const RightDrawer = DrawerNavigator(
    {
        Set: SettingsNavigator,
        Tab: Tab
    },
    {
        initialRouteName: 'Tab',
        drawerPosition: 'right',
        drawerOpenRoute: 'Filter',
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <Filter {...props} />,
        drawerBackgroundColor: 'rgba(0, 0, 0, 0.9)'
    }
);

const Drawer = DrawerNavigator(
    {
        RightDrawer: { screen: RightDrawer }
    },
    {
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <SideBar {...props} />,
        drawerBackgroundColor: 'rgba(0, 0, 0, 0.9)'
    }
);

export default () => (
    <Root>
        <Drawer />
    </Root>
);
