import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as itemsActions from './items.actions';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Items';

class Items extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false
		};

		this._viewItem = this._viewItem.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveItems();

	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.happyIndex && nextProps.curatedItems) {
			this.setState({ isLoading: false });
		}

	}

	_retrieveItems(isRefreshed) {
		//this.props.actions.retrieveLogin();
		this.props.actions.retrieveHappyIndex();
		this.props.actions.retrieveCuratedItems();

		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_viewItemsList(type, title) {
		this.props.navigator.showModal({
			title,
			screen: 'movieapp.ItemsList',
			passProps: {
				type
			}
		});
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
		this._retrieveItems('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'search') {
				this.props.navigator.showModal({
					screen: 'movieapp.ItemSearch',
					title: 'Search'
				});
			}
		}
	}

	render() {
		const { happyIndex, curatedItems } = this.props;
		const iconPlay = <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />;
		const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
				style={styles.container}
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
				}>
				<Swiper
					autoplay
					autoplayTimeout={4}
					showsPagination={false}
					height={220}>
					{happyIndex.map(info => (
						<CardOne key={info.key} info={info} viewItem={this._viewItem} />
					))}
				</Swiper>
				<View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>추천 아이템</Text>
						<TouchableOpacity>
							<Text
								style={styles.listHeadingRight}
								onPress={this._viewItemsList.bind(this, 'curated_item', '추천 아이템')}>
								See all
							</Text>
						</TouchableOpacity>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{curatedItems.map(info => (
							<CardTwo key={info.productCode} info={info} viewItem={this._viewItem} />
						))}
					</ScrollView>
					<View style={styles.browseList}>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconPlay}
								<Text
									style={styles.browseListItemText}
									onPress={this._viewItemsList.bind(this, 'coupon', '나의 쿠폰')}>
									나의 쿠폰
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconTop}
								<Text style={styles.browseListItemText} onPress={this._viewItemsList.bind(this, 'near_item', '내 주변의 아이템')}>
									내 주변의 아이템
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconUp}
								<Text
									style={styles.browseListItemText}
									onPress={this._viewItemsList.bind(this, 'buy_history', '구매 내역')}>
									구매 내역
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}

Items.propTypes = {
	actions: PropTypes.object.isRequired,
	curatedItems: PropTypes.array.isRequired,
	happyIndex: PropTypes.array.isRequired,
	// login: PropTypes.object.isRequired,
	navigator: PropTypes.object
};


let rightButtons = [];

if (Platform.OS === 'ios') {
	rightButtons = [
		{
			id: 'search',
			icon: require('../../img/ios-search.png') // eslint-disable-line
		}
	];
}

Items.navigatorButtons = {
	rightButtons
};

function mapStateToProps(state, ownProps) {

	return {
		//login: state.items.login,
		curatedItems: state.items.curatedItems,
		happyIndex: state.items.happyIndex
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
