import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.items, action) {
	switch (action.type) {

		case types.RETRIEVE_USERINFO_SUCCESS:
			return {
				...state,
				userInfo: action.userInfo
			};


		case types.RETRIEVE_HAPPYINDEX_SUCCESS:
			return {
				...state,
				happyIndex: action.happyIndex
			};


		case types.RETRIEVE_CURATED_ITEMS_SUCCESS:
			return {
				...state,
				curatedItems: action.curatedItems
			};

		case types.RETRIEVE_NEAR_ITEMS_SUCCESS:
			return {
				...state,
				nearItems: action.nearItems
			};

		case types.RETRIEVE_ITEMS_LIST_SUCCESS:
			return {
				...state,
				list: action.list
			};

		case types.RETRIEVE_ITEM_DETAILS_SUCCESS:
			return {
				...state,
				details: action.details
			};

		case types.RETRIEVE_ITEMS_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};
		default:
			return state;
	}
}
