import axios from 'axios';

import * as types from '../../constants/actionTypes';
import { OPENMARKET_URL, OPENMARKET_API_KEY, PLATEFORM_URL, TMDB_API_KEY } from '../../constants/api';

// Login
export function retrieveLoginSuccess(res) {
	return {
		type: types.RETRIEVE_LOGIN_SUCCESS,
		login: res.headers
	};
}

export function retrieveLogin() {
	return function (dispatch) {

		// var formData = new FormData();
		// formData.append('_objId', 'test');
		// formData.append('_objPassword', 'test');
        //
		// return fetch(`${OPENMARKET_URL}/FrontStore/iUserLogin.phtml`, {
		// 	method: 'POST',
		// 	//headers: {
		// 		//'Content-Type': 'application/json'
		// 	//},
		// 	body: formData,
		// }).then(res =>  {
        //
		// 	const data = res;
        //
		// 	console.log('==================================');
		// 	console.log(data)
		// 	console.log('==================================');
        //
		// 	dispatch(retrieveLoginSuccess(res));
        //
	 	// }).catch(function(error) {
		// 	console.log('request failed', error)
		// });

		return axios.post(`${OPENMARKET_URL}/FrontStore/iUserLogin.phtml`,{
				jar: true,
				withCredentials: true,
				_objId: 'test',
				_objPassword: 'test',
			})
			.then(res => {

				const data = res.config;

				console.log('==================================');
				console.log(data)
				console.log('==================================');

				dispatch(retrieveLoginSuccess(res));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

// UserInfo
export function retrieveUserInfoSuccess(res) {
	return {
		type: types.RETRIEVE_USERINFO_SUCCESS,
		userInfo: res.data
	};
}

export function retrieveUserInfo() {
	return function (dispatch) {
		return axios.post(`${OPENMARKET_URL}/FrontStore/ajax/axGetUserInfo.phtml`,{
			oCmd: 'test',
		})
			.then(res => {
				console.log('==================================');
				console.log(res);
				console.log('==================================');
				dispatch(retrieveUserInfoSuccess(res));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

// HappyIndex
export function retrieveHappyIndexSuccess(res) {
	return {
		type: types.RETRIEVE_HAPPYINDEX_SUCCESS,
		happyIndex: res.data.response.indices,
	};
}

export function retrieveHappyIndex() {
	return function (dispatch) {
		var userId = 'tmkwak';
		return axios.get(`${PLATEFORM_URL}/v1/hcpr/indexnumber/all/${userId}`)
			.then(res => {

				if(res.data.response.code != '200') {
					console.log('error');
				}

				// console.log('==================================');
				// console.log(res.data.response.indices);
				// console.log('==================================');

				dispatch(retrieveHappyIndexSuccess(res));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

// HappyIndex
export function retrieveHappyDetailSuccess(res) {
	return {
		type: types.RETRIEVE_HAPPYDETAIL_SUCCESS,
		happyDetail: res.data.response.detail,
	};
}

export function retrieveHappyDetail(userId, happyKey) {
	return function (dispatch) {
		// var userId = 'tmkwak';
		// var happyKey = 'tmkwak';

		return axios.get(`${PLATEFORM_URL}/v1/hcpr/indexnumber/detail/${userId}/${happyKey}`)
			.then(res => {

				if(res.data.response.code != '200') {
					console.log('error');
				}

				dispatch(retrieveHappyDetailSuccess(res));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

// CuratedItems
export function retrieveCuratedItemsSuccess(res) {
	return {
		type: types.RETRIEVE_CURATED_ITEMS_SUCCESS,
		curatedItems: res.data.response.categories,
	};
}

export function retrieveCuratedItems() {
	return function (dispatch) {
		var userId = 'test';
		return axios.get(`${PLATEFORM_URL}/ws/demandindex/${userId}`)
			.then(res => {
				dispatch(retrieveCuratedItemsSuccess(res));
			})
			.catch(error => {
				console.log(error);
			});
	};
}

// NearItems
export function retrieveNearItemsSuccess(res) {
	return {
		type: types.RETRIEVE_NEAR_ITEMS_SUCCESS,
		nearItems: res.data.response.nearitems,
	};
}

export function retrieveNearItems() {
	console.log('... retrieveNearItems ...');
	return function (dispatch) {
		var userId = 'test';
		return axios.get(`${PLATEFORM_URL}/ws/nearitems/${userId}`)
			.then(res => {
				dispatch(retrieveNearItemsSuccess(res));
			})
			.catch(error => {
				console.log(error); //eslint-disable-line
			});
	};
}

// ItemsList
export function retrieveItemsListSuccess(res) {
	return {
		type: types.RETRIEVE_ITEMS_LIST_SUCCESS,
		list: res.data.response.categories,
	};
}

export function retrieveItemsList(type, page) {
	return function (dispatch) {
		return axios.get(`${PLATEFORM_URL}/ws/demandindex/${type}`)
			.then(res => {
				dispatch(retrieveItemsListSuccess(res));
			})
			.catch(error => {
				console.log(error); //eslint-disable-line
			});
	};
}

// ItemDetails
export function retrieveItemDetailsSuccess(res) {
	return {
		type: types.RETRIEVE_ITEM_DETAILS_SUCCESS,
		details: res.data.response.details,
	};
}

export function retrieveItemDetails() {
	return function (dispatch) {
		return axios.get(`${PLATEFORM_URL}/ws/item/11111`)
			.then(res => {
				dispatch(retrieveItemDetailsSuccess(res));
			})
			.catch(error => {
				console.log(error); //eslint-disable-line
			});
	};
}

// ItemsSearchList
export function retrieveItemsSearchListSuccess(res) {
	return {
		type: types.RETRIEVE_ITEMS_SEARCH_RESULT_SUCCESS,
		searchResults: res.data
	};
}

export function retrieveItemsSearchList() {
	return function (dispatch) {
		return axios.get(`${OPENMARKET_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
			.then(res => {
				dispatch(retrieveItemsSearchListSuccess(res));
			})
			.catch(error => {
				console.log(error); //eslint-disable-line
			});
	};
}

