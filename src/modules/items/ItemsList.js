import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	RefreshControl
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TMDB_URL, TMDB_API_KEY } from '../../constants/api';
import * as itemsActions from './items.actions';
import CardThree from './components/CardThree';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/ItemsList';

class ItemsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			currentPage: 1,
			list: {
				results: []
			}
		};

		this._viewItem = this._viewItem.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveItemsList();
	}

	_retrieveItemsList(isRefreshed) {
		this.props.actions.retrieveItemsList(this.props.type, this.state.currentPage)
			.then(() => {
				const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
				const dataSource = ds.cloneWithRows(this.props.list);
				this.setState({
					list: this.props.list,
					dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrieveNextPage(type) {
		// if (this.state.currentPage !== this.props.list.total_pages) {
		// 	this.setState({
		// 		currentPage: this.state.currentPage + 1
		// 	});
    	//
		// 	let page;
		// 	if (this.state.currentPage === 1) {
		// 		page = 2;
		// 		this.setState({ currentPage: 2 });
		// 	} else {
		// 		page = this.state.currentPage + 1;
		// 	}
    	//
		// 	axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`)
		// 		.then(res => {
		// 			const data = this.state.list.results;
		// 			const newData = res.data.results;
    	//
		// 			newData.map((item, index) => data.push(item));
    	//
		// 			this.setState({
		// 				dataSource: this.state.dataSource.cloneWithRows(this.state.list.results)
		// 			});
		// 		}).catch(err => {
		// 			console.log('next page', err); // eslint-disable-line
		// 		});
		// }
	}

	_viewItem(itemId) {
		this.props.navigator.showModal({
			screen: 'movieapp.Item',
			passProps: {
				itemId
			}
		});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveItemsList('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ListView
				style={styles.container}
				enableEmptySections
				onEndReached={type => this._retrieveNextPage(this.props.type)}
				onEndReachedThreshold={1200}
				dataSource={this.state.dataSource}
				renderRow={rowData => <CardThree info={rowData} viewItem={this._viewItem} />}
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}
			/>
		);
	}
}

ItemsList.propTypes = {
	actions: PropTypes.object.isRequired,
	list: PropTypes.array.isRequired,
	// type: PropTypes.string.isRequired,
	navigator: PropTypes.object
};

let rightButtons = [];

if (Platform.OS === 'ios') {
	rightButtons = [
		{
			id: 'close',
			title: 'Close'
		}
	];
}

ItemsList.navigatorButtons = {
	rightButtons
};

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

ItemsList.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		list: state.items.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
