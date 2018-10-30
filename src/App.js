import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import SideBar from './screens/sidebar';
import Cards from './screens/cards';

const Drawer = DrawerNavigator(
    {
        Cards: { screen: Cards }
    },
    {
        initialRouteName: 'Cards',
        navigationOptions: { drawerLockMode: 'locked-closed' },
        contentOptions: {
            activeTintColor: '#e91e63'
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer }
    },
    {
        initialRouteName: 'Drawer',
        headerMode: 'none'
    }
);

export default () => (
    <Root>
        <AppNavigator />
    </Root>
);
