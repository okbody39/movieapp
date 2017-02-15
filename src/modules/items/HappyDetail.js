import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
	Linking,
	Platform,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ChartView from 'react-native-highcharts';

import * as itemsActions from './items.actions';
import Barcode from './tabs/Barcode';
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import ProgressBar from '../_global/ProgressBar';
// import Trailers from './tabs/Trailers';
import styles from './styles/HappyDetail';
import { TMDB_IMG_URL, YOUTUBE_API_KEY, YOUTUBE_URL } from '../../constants/api';

var Slider = require('react-native-slider');

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
			value: 2,
			value2: 2,
			value3: 2,
			value4: 2,
			value5: 2,
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onContentSizeChange = this._onContentSizeChange.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));

		this._poll = this._poll.bind(this);

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


				// console.log('===========================');
				// console.log(this.props.happyKey);
				// console.log(this.props.happyDetail);
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

	_poll() {
		this.props.navigator.showModal({
			title: '설문하기',
			screen: 'movieapp.CardPoll',
			passProps: {

			}
		});
	}

	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		const { happyDetail, happyInfo } = this.props;
		const history = happyDetail.history;
		const category = happyDetail.category;


		console.log('[RENDER]==========================='+history);

		let height;
		// if (this.state.tab === 0) height = this.state.infoTabHeight;
		// if (this.state.tab === 1) height = this.state.castsTabHeight;
		// if (this.state.tab === 2) height = this.state.trailersTabHeight;


		height = 300;
		// console.log(height);

		var Highcharts='Highcharts';
		var conf={
			chart: {
				type: 'line',
				backgroundColor: '#0a0a0a',
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,
				// events: {
				// 	load: function () {
				// 		// set up the updating of the chart each second
				// 		var series = this.series[0];
				// 		setInterval(function () {
				// 			var x = (new Date()).getTime(), // current time
				// 				y = Math.random();
				// 			series.addPoint([x, y], true, true);
				// 		}, 1000);
				// 	}
				// }
			},
			title: {
				text: null
			},
			xAxis: {
				categories: category
			},
			yAxis: {
				title: {
					text: null, //'지수값'
				},
				labels: {
					enabled: false
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				gridLineColor: '#808080',
				gridLineDashStyle: 'longdash',
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: true,
						style: {"color": "white", "fontSize": "15px", "fontWeight": "bold" }
					},
					enableMouseTracking: false
				},
				series: {
					marker: {
						lineWidth: 3,
						lineColor: 'white',
						fillColor: 'red'
					}
				}
			},
			// tooltip: {
			// 	formatter: function () {
			// 		return '<b>' + this.series.name + '</b><br/>' +
			// 			Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
			// 			Highcharts.numberFormat(this.y, 2);
			// 	}
			// },
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: '지수',
				lineWidth: 2,
				lineColor: 'white',
				marker: {
					radius: 4
				},
				data: history,
			}]
		};

		var conf2={
			chart: {
				polar: true,
				type: 'area'
			},
			title: {
				text: null
			},
			xAxis: {
				categories: ['친밀감', '유대감', '신뢰감', '가족결속력', '친밀도'],
				//tickmarkPlacement: 'on',
				lineWidth: 0
			},
			yAxis: {
				gridLineInterpolation: 'polygon',
				lineWidth: 0,
				min: 0
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				area: {
					dataLabels: {
						enabled: true,
						style: {"color": "black", "fontSize": "15px", "fontWeight": "bold" }
					},
					enableMouseTracking: false
				},
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'v',
				data: [3, 3, 1, 4, 3],
				// pointPlacement: 'on'
			}]
		};

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

					<ChartView style={styles.chartContainer} config={conf}></ChartView>

					<ChartView style={styles.chartContainer2} config={conf2}></ChartView>

					<View style={styles.browseList}>
						<View style={styles.browseListItem}>
							<Text style={styles.browseListItemText}>
								{happyInfo.description}
							</Text>
						</View>
						<View style={styles.browseListItem}>
							<TouchableOpacity activeOpacity={0.9} onPress={this._poll}>
								<View style={styles.viewButton}>
									<Text style={styles.viewButtonText}>설문하기</Text>
								</View>
							</TouchableOpacity>
						</View>

						{/*<View style={styles.browseListItem}>*/}
							{/*<View style={{*/}
								{/*flex: 1,*/}
								{/*marginLeft: 10,*/}
								{/*marginRight: 10,*/}
								{/*alignItems: 'stretch',*/}
								{/*justifyContent: 'center',*/}
							{/*}}>*/}
								{/*<Text style={styles.browseListItemText}>Q. 귀하는 본인의 소득에 만족합니까?</Text>*/}
								{/*<Slider*/}
									{/*value={this.state.value}*/}
									{/*onValueChange={(value) => this.setState({value})}*/}
									{/*step={1}*/}
									{/*minimumValue={1}*/}
									{/*maximumValue={3}*/}
									{/*trackStyle={{height: 4, borderRadius: 2, marginTop: -4}}*/}
									{/*thumbStyle={{*/}
										{/*width: 30,*/}
										{/*height: 30,*/}
										{/*borderRadius: 30 / 2,*/}
										{/*backgroundColor: '#F5B642',*/}
										{/*borderColor: '#F5B642',*/}
										{/*borderWidth: 2,}}*/}
									{/*minimumTrackTintColor='#F5B642'*/}
								{/*/>*/}
								{/*<Text style={{color: "#666666", fontSize: 11}}>{this.state.value == 1 ? '매우 불만족' : this.state.value == 2 ? '보통' : '매우 만족'}</Text>*/}

								{/*<Text style={styles.browseListItemText}>Q. 귀하는 일반적으로 스트레스를 많이 받는 편입니까?</Text>*/}
								{/*<Slider*/}
									{/*value={this.state.value2}*/}
									{/*onValueChange={(value2) => this.setState({value2})}*/}
									{/*step={1}*/}
									{/*minimumValue={1}*/}
									{/*maximumValue={3}*/}
									{/*trackStyle={{height: 4, borderRadius: 2, marginTop: -4}}*/}
									{/*thumbStyle={{*/}
										{/*width: 30,*/}
										{/*height: 30,*/}
										{/*borderRadius: 30 / 2,*/}
										{/*backgroundColor: '#F5B642',*/}
										{/*borderColor: '#F5B642',*/}
										{/*borderWidth: 2,}}*/}
									{/*minimumTrackTintColor='#F5B642'*/}
								{/*/>*/}
								{/*<Text style={{color: "#666666", fontSize: 11}}>{this.state.value2 == 1 ? '전혀 그렇지 않다' : this.state.value2 == 2 ? '보통' : '매우 그렇다'}</Text>*/}

								{/*<Text style={styles.browseListItemText}>Q. 귀하는 충분한 수면을 취하지 못한다고 생각합니까?</Text>*/}
								{/*<Slider*/}
									{/*value={this.state.value3}*/}
									{/*onValueChange={(value3) => this.setState({value3})}*/}
									{/*step={1}*/}
									{/*minimumValue={1}*/}
									{/*maximumValue={3}*/}
									{/*trackStyle={{height: 4, borderRadius: 2, marginTop: -4}}*/}
									{/*thumbStyle={{*/}
										{/*width: 30,*/}
										{/*height: 30,*/}
										{/*borderRadius: 30 / 2,*/}
										{/*backgroundColor: '#F5B642',*/}
										{/*borderColor: '#F5B642',*/}
										{/*borderWidth: 2,}}*/}
									{/*minimumTrackTintColor='#F5B642'*/}
								{/*/>*/}
								{/*<Text style={{color: "#666666", fontSize: 11}}>{this.state.value3 == 1 ? '전혀 그렇지 않다' : this.state.value3 == 2 ? '보통' : '매우 그렇다'}</Text>*/}

								{/*<Text style={styles.browseListItemText}>Q. 귀하는 문화여가를 정기적으로 하는 편입니까?</Text>*/}
								{/*<Slider*/}
									{/*value={this.state.value4}*/}
									{/*onValueChange={(value4) => this.setState({value4})}*/}
									{/*step={1}*/}
									{/*minimumValue={1}*/}
									{/*maximumValue={3}*/}
									{/*trackStyle={{height: 4, borderRadius: 2, marginTop: -4}}*/}
									{/*thumbStyle={{*/}
										{/*width: 30,*/}
										{/*height: 30,*/}
										{/*borderRadius: 30 / 2,*/}
										{/*backgroundColor: '#F5B642',*/}
										{/*borderColor: '#F5B642',*/}
										{/*borderWidth: 2,}}*/}
									{/*minimumTrackTintColor='#F5B642'*/}
								{/*/>*/}
								{/*<Text style={{color: "#666666", fontSize: 11}}>{this.state.value4 == 1 ? '전혀 그렇지 않다' : this.state.value4 == 2 ? '보통' : '매우 그렇다'}</Text>*/}

								{/*<Text style={styles.browseListItemText}>Q. 귀하는 평소 현재 거주하는 주택에서 소음(층간소음, 자동차 소음, 고성방가 등)으로 인한 스트레스를 받는 편입니까?</Text>*/}
								{/*<Slider*/}
									{/*value={this.state.value5}*/}
									{/*onValueChange={(value5) => this.setState({value5})}*/}
									{/*step={1}*/}
									{/*minimumValue={1}*/}
									{/*maximumValue={3}*/}
									{/*trackStyle={{height: 4, borderRadius: 2, marginTop: -4}}*/}
									{/*thumbStyle={{*/}
										{/*width: 30,*/}
										{/*height: 30,*/}
										{/*borderRadius: 30 / 2,*/}
										{/*backgroundColor: '#F5B642',*/}
										{/*borderColor: '#F5B642',*/}
										{/*borderWidth: 2,}}*/}
									{/*minimumTrackTintColor='#F5B642'*/}
								{/*/>*/}
								{/*<Text style={{color: "#666666", fontSize: 11}}>{this.state.value5 == 1 ? '전혀 그렇지 않다' : this.state.value5 == 2 ? '보통' : '매우 그렇다'}</Text>*/}

							{/*</View>*/}
						{/*</View>*/}
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

HappyDetail.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

HappyDetail.propTypes = {
	actions: PropTypes.object.isRequired,
	happyDetail: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	happyKey: PropTypes.string.isRequired,
	happyInfo: PropTypes.object.isRequired
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
