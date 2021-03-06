import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import configureStore from './store/configureStore';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navigationBarColor: 'black',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	tabBarButtonColor: 'red',
	tabBarSelectedButtonColor: 'red',
	tabBarBackgroundColor: 'white'
};

Navigation.startSingleScreenApp({
	screen: {
		screen: 'movieapp.Items',
		title: '나의 행복지수',
		//id: 'sideMenu',
		navigatorButtons: {
			leftButtons: [{
				id: 'sideMenu',
			}],
			rightButtons: [],
		},
		navigatorStyle
	},
	drawer: {
		left: {
			screen: 'movieapp.NewDrawer'
		},
	}
});

// Navigation.startSingleScreenApp({
// 	screen: {
// 		screen: 'movieapp.Movies',
// 		title: 'Movies',
// 		navigatorStyle
// 	},
// 	drawer: {
// 		left: {
// 			screen: 'movieapp.Drawer'
// 		}
// 	}
// });
