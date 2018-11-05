import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import SideBar from './screens/sidebar';
import Filter from './screens/filter';
import Cards from './screens/cards';
import Card from './screens/card';

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

const RightDrawer = DrawerNavigator(
    {
        App: AppNavigator
    },
    {
        initialRouteName: 'App',
        drawerPosition: 'right',
        drawerOpenRoute: 'Filter',
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <Filter {...props} />
    }
);

const Drawer = DrawerNavigator(
    {
        RightDrawer: { screen: RightDrawer }
    },
    {
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentComponent: props => <SideBar {...props} />
    }
);

export default () => (
    <Root>
        <Drawer />
    </Root>
);
