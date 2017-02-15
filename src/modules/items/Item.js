import React, { Component, PropTypes } from 'react';
import {
	Image,
	Linking,
	Platform,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as itemsActions from './items.actions';
import Barcode from './tabs/Barcode';
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import ProgressBar from '../_global/ProgressBar';
import Trailers from './tabs/Trailers';
import styles from './styles/Item';
import { TMDB_IMG_URL, YOUTUBE_API_KEY, YOUTUBE_URL } from '../../constants/api';

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//heightAnim: null,
			infoTabHeight: null,
			qrTabHeight: null,
			isLoading: true,
			isRefreshing: false,
			//showSimilarMovies: true,
			//trailersTabHeight: null,
			tab: 0,
			//youtubeVideos: []
		};

		//this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onContentSizeChange = this._onContentSizeChange.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this._viewItem = this._viewItem.bind(this);
		// this._openYoutube = this._openYoutube.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveDetails();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.details) this.setState({ isLoading: false });
	}

	_retrieveDetails(isRefreshed) {
		this.props.actions.retrieveItemDetails(this.props.itemId)
			.then(() => {
				// this._retrieveYoutubeDetails();

				// console.log('===========================');
				// console.log(this.props.itemId);
				// console.log(this.props.details);
				// console.log('===========================');


			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveDetails('isRefreshed');
	}

	_onScroll(event) {
		const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
		if (contentOffsetY > 150) {
			this._toggleNavbar('hidden');
		} else {
			this._toggleNavbar('shown');
		}
	}

	_toggleNavbar(status) {
		this.props.navigator.toggleNavBar({
			to: status,
			animated: true
		});
	}

	_onChangeTab({ i, ref }) {

		//console.log("CHANGE TAB: "+i);

		this.setState({ tab: i });
	}

	// ScrollView onContentSizeChange prop
	_onContentSizeChange(width, height) {
		// console.log('========================');
		// console.log(width, height);
		// console.log(this.state.tab, this.state.infoTabHeight, this.state.qrTabHeight);

		// if (this.state.tab === 0 && this.state.infoTabHeight === this.state.qrTabHeight) {
		// 	this.setState({ infoTabHeight: height });
		// }
	}

	// _getTabHeight(tabName, height) {
  //
	// 	// console.log("GET TAB HEIGHT: "+tabName);
   //  //
	// 	// if (tabName === 'info') this.setState({ infoTabHeight: height });
	// 	// if (tabName === 'qr') this.setState({ qrTabHeight: height });
	// 	//if (tabName === 'trailers') this.setState({ trailersTabHeight: height });
	// }

	_viewItem(itemId) {
		this.props.navigator.push({
			screen: 'movieapp.Item',
			passProps: {
				itemId
			}
		});
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		const { details } = this.props;
		const info = details;

		let height;
		//if (this.state.tab === 0) height = this.state.infoTabHeight;
		//if (this.state.tab === 1) height = this.state.qrTabHeight;
		// if (this.state.tab === 2) height = this.state.trailersTabHeight;

		//console.log('[RENDER] HEIGHT: ' + height, 'TAB: '+this.state.tab);

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
					style={styles.container}
					onScroll={this._onScroll.bind(this)}
					scrollEventThrottle={100}
					onContentSizeChange={this._onContentSizeChange}
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
				<View>
					{/*<Swiper*/}
						{/*style={styles.swiper}*/}
						{/*autoplay*/}
						{/*autoplayTimeout={4}*/}
						{/*showsPagination={false}*/}
						{/*height={248}*/}
						{/*loop*/}
						{/*index={5}>*/}
						{/*{*/}
							{/*info.images.backdrops.map((item, index) => (*/}
								{/*<View key={index}>*/}
									{/*<Image source={{ uri: `${TMDB_IMG_URL}/w780/${(item.file_path)}` }} style={styles.imageBackdrop} />*/}
									{/*<LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']} style={styles.linearGradient} />*/}
								{/*</View>*/}
							{/*))*/}
						{/*}*/}
					{/*</Swiper>*/}
					<View style={styles.cardContainer}>
						<Image source={{ uri: info.image }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text style={styles.cardTitle}>{info.productName}</Text>
							<Text style={styles.cardTagline}>{info.productCode}</Text>
							{/*<View style={styles.cardGenre}>*/}
								{/*{*/}
									{/*info.genres.map(item => (*/}
										{/*<Text key={item.id} style={styles.cardGenreItem}>{item.name}</Text>*/}
									{/*))*/}
								{/*}*/}
							{/*</View>*/}
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									{iconStar}
									<Text style={styles.cardStarRatings}>{info.price}</Text>
								</View>
								{/*<Text style={styles.cardRunningHours} />*/}
							</View>
						</View>
					</View>
					<View style={styles.contentContainer}>
						<ScrollableTabView
							onChangeTab={this._onChangeTab}
							renderTabBar={() => (
								<DefaultTabBar
									textStyle={styles.textStyle}
									underlineStyle={styles.underlineStyle}
									style={styles.tabBar}
								/>
							)}>
							<Info tabLabel="상세정보" info={info} />
							<Barcode tabLabel="QR코드" info={info} />
						</ScrollableTabView>
					</View>
				</View>
			</ScrollView>
		);
	}
}

Item.navigatorStyle = {
	navBarTransparent: true,
	drawUnderNavBar: true,
	navBarTranslucent: true,
	statusBarHidden: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

let rightButtons = [];

if (Platform.OS === 'ios') {
	rightButtons = [
		{
			id: 'close',
			icon: require('../../img/arrow-down.png') // eslint-disable-line
		}
	];
}

Item.navigatorButtons = {
	rightButtons
};

Item.propTypes = {
	actions: PropTypes.object.isRequired,
	details: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	itemId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		details: state.items.details,
		// similarMovies: state.movies.similarMovies
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
