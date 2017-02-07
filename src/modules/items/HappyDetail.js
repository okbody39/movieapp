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

import { SmoothLine } from 'react-native-pathjs-charts'

import * as itemsActions from './items.actions';
import Barcode from './tabs/Barcode';
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import ProgressBar from '../_global/ProgressBar';
// import Trailers from './tabs/Trailers';
import styles from './styles/Item';
import { TMDB_IMG_URL, YOUTUBE_API_KEY, YOUTUBE_URL } from '../../constants/api';

class HappyDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			castsTabHeight: null,
			heightAnim: null,
			infoTabHeight: 1996,
			isLoading: true,
			isRefreshing: false,
			//showSimilarMovies: true,
			//trailersTabHeight: null,
			tab: 0,
			//youtubeVideos: []
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onContentSizeChange = this._onContentSizeChange.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveDetails();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.happyDetail) this.setState({ isLoading: false });
	}

	_retrieveDetails(isRefreshed) {
		this.props.actions.retrieveHappyDetail('tmkwak', this.props.happyKey)
			.then(() => {


				console.log('===========================');
				console.log(this.props.happyKey);
				console.log(this.props.happyDetail);
				console.log('===========================');



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
		this.setState({ tab: i });
	}

	_onContentSizeChange(width, height) {
		if (this.state.tab === 0 && this.state.infoTabHeight === this.state.castsTabHeight) {
			this.setState({ infoTabHeight: height });
		}
	}

	_getTabHeight(tabName, height) {
		if (tabName === 'qrcode') this.setState({ castsTabHeight: height });
		//if (tabName === 'trailers') this.setState({ trailersTabHeight: height });
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
		const { happyDetail } = this.props;
		const history = happyDetail.history;


		console.log('[RENDER]==========================='+history);

		let height;
		// if (this.state.tab === 0) height = this.state.infoTabHeight;
		// if (this.state.tab === 1) height = this.state.castsTabHeight;
		// if (this.state.tab === 2) height = this.state.trailersTabHeight;


		height = 300;
		// console.log(height);

		let options = {
			width: 280,
			height: 280,
			color: '#2980B9',
			margin: {
				top: 20,
				left: 45,
				bottom: 25,
				right: 20
			},
			animate: {
				type: 'delayed',
				duration: 200
			},
			axisX: {
				showAxis: true,
				showLines: true,
				showLabels: true,
				showTicks: true,
				zeroAxis: false,
				orient: 'bottom',
				label: {
					fontFamily: 'Arial',
					fontSize: 14,
					fontWeight: true,
					fill: '#34495E'
				}
			},
			axisY: {
				showAxis: true,
				showLines: true,
				showLabels: true,
				showTicks: true,
				zeroAxis: false,
				orient: 'left',
				label: {
					fontFamily: 'Arial',
					fontSize: 14,
					fontWeight: true,
					fill: '#34495E'
				}
			}
		}

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
				<View style={{ height }}>
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
						<SmoothLine data={history} options={options} xKey='date' yKey='value' />
					</View>

				</View>
			</ScrollView>
		);
	}
}

HappyDetail.navigatorStyle = {
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

HappyDetail.navigatorButtons = {
	rightButtons
};

HappyDetail.propTypes = {
	actions: PropTypes.object.isRequired,
	happyDetail: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	happyKey: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		happyDetail: state.items.happyDetail,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HappyDetail);
