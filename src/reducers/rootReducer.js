import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';
import items from '../modules/items/items.reducer';

const rootReducer = combineReducers({
	movies,
	items
});

export default rootReducer;
