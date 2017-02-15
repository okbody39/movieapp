/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import NewDrawer from './modules/_global/NewDrawer';
import Items from './modules/items/Items';
import NearItems from './modules/items/NearItems';
import ItemsList from './modules/items/ItemsList';
import Item from './modules/items/Item';
import HappyDetail from './modules/items/HappyDetail';
import ItemSearch from './modules/items/ItemSearch';

import CardPoll from './modules/items/CardPoll';

// import Drawer from './modules/_global/Drawer';
// import Movies from './modules/movies/Movies';
// import MoviesList from './modules/movies/MoviesList';
// import Movie from './modules/movies/Movie';
// import Search from './modules/movies/Search';

export function registerScreens(store, Provider) {

	Navigation.registerComponent('movieapp.Item', () => Item, store, Provider);
	Navigation.registerComponent('movieapp.HappyDetail', () => HappyDetail, store, Provider);
	Navigation.registerComponent('movieapp.Items', () => Items, store, Provider);
	Navigation.registerComponent('movieapp.NearItems', () => NearItems, store, Provider);
	Navigation.registerComponent('movieapp.ItemsList', () => ItemsList, store, Provider);
	Navigation.registerComponent('movieapp.NewDrawer', () => NewDrawer, store, Provider);
	Navigation.registerComponent('movieapp.ItemSearch', () => ItemSearch, store, Provider);

	Navigation.registerComponent('movieapp.CardPoll', () => CardPoll, store, Provider);

	// Navigation.registerComponent('movieapp.Movie', () => Movie, store, Provider);
	// Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
	// Navigation.registerComponent('movieapp.MoviesList', () => MoviesList, store, Provider);
	// Navigation.registerComponent('movieapp.Search', () => Search, store, Provider);
	// Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
