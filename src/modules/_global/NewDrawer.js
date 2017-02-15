import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	DeviceEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Beacons from 'react-native-beacons-android'

var PushNotification = require('react-native-push-notification');
import axios from 'axios';
import { OPENMARKET_URL, OPENMARKET_API_KEY, PLATEFORM_URL, TMDB_API_KEY } from '../../constants/api';

import styles from './styles/Drawer';

class NewDrawer extends Component {
	constructor(props) {
		super(props);

		this._beforeDetectedBeacon = null;

		this._goToItems = this._goToItems.bind(this);
		this._goToNearItems = this._goToNearItems.bind(this);
		this._openSearch = this._openSearch.bind(this);
		this._handleNotificationAction = this._handleNotificationAction.bind(this);
	}

	_openSearch() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.ItemSearch',
			title: '검색'
		});
	}

	_goToItems() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.ItemsList',
			title: '추천 아이템'
		});
	}

	_goToNearItems() {
		this._toggleDrawer();

		//this.props.navigator.showModal({
		this.props.navigator.push({
			screen: 'movieapp.NearItems',
			title: '주변 아이템'
		});

		// this.props.navigator.push({
		// 	screen: 'movieapp.NearItems',
		// 	title: '주변 아이템',
		// 	passProps: {},
		// 	// animated: true,
		// 	// navigatorStyle: {},
		// 	// navigatorButtons: {}
    	//
		// });
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	_beaconsDidRange(data) {
		if(data.beacons.length == 0) {
			//this.setState({distance: '-'});
			//this.setState({found: ''});
			return;
		}

		data.beacons.forEach((b) => {

			// this.props.navigator.showLightBox({
			// 	screen: "items.LightBoxScreen", // unique ID registered with Navigation.registerScreen
			// 	passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
			// 	style: {
			// 		backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
			// 		backgroundColor: "#ff000080" // tint color for the background, you can specify alpha here (optional)
			// 	}
			// });
			let dist = b.distance.toFixed(3);

			if(this._beforeDetectedBeacon == b.uuid) {
				return;
			}

			if(dist < 1) {

				this._beforeDetectedBeacon = b.uuid;
				// ToastAndroid.show(b.uuid+'-'+dist, ToastAndroid.SHORT);

				axios.get(`${PLATEFORM_URL}/ws/mdinfo/${b.uuid}`)
					.then(res => {

						let mdinfo = res.data.response.mdinfo;

						PushNotification.localNotification({
							// id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
							// ticker: notification.message, // (optional)
							autoCancel: true, // (optional) default: true
							largeIcon: "hpmall", // (optional) default: "ic_launcher"
							smallIcon: "hpmall", // (optional) default: "ic_notification" with fallback for "ic_launcher"
							// bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
							// subText: "This is a subText", // (optional) default: none
							// color: "red", // (optional) default: system default
							vibrate: false, // (optional) default: true
							// vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
							// tag: 'some_tag', // (optional) add tag to message
							// group: "group", // (optional) add group to message
							// ongoing: false, // (optional) set whether this is an "ongoing" notification

							/* iOS only properties */
							// alertAction: // (optional) default: view
							// category: // (optional) default: null
							// userInfo: // (optional) default: null (object containing additional notification data)

							/* iOS and Android properties */
							title: mdinfo.name, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
							message: mdinfo.address, // (required)
							// playSound: true, // (optional) default: true
							// soundName: 'catmeow', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
							// number: notification.number, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)

							// repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
							actions: '["상점방문"]',  // (Android only) See the doc for notification actions to know more
						});
					})
					.catch(error => {

					});


			}
		});
	}

	_handleNotificationAction(action) {
		console.log ('==== Notification action received: ' + action.dataJSON);
		const info = JSON.parse(action.dataJSON);
		if (info.action == '상점방문') {
			this.props.navigator.push({
				screen: 'movieapp.NearItems',
				title: '주변 아이템'
			});
		}
	}

	componentWillMount() {
		Beacons.detectIBeacons();

		try {
			Beacons.startRangingBeaconsInRegion('LATTETALKREGION1');

			DeviceEventEmitter.addListener('beaconsDidRange', this._beaconsDidRange);

		} catch (err) {
		}

		PushNotification.registerNotificationActions(['상점방문']);
		DeviceEventEmitter.addListener('notificationActionReceived', this._handleNotificationAction);
	}

	render() {
		const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={this._openSearch}>
							<View style={styles.drawerListItem}>
								{iconSearch}
								<Text style={styles.drawerListItemText}>
									검색
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToItems}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									추천 아이템
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToNearItems}>
							<View style={styles.drawerListItem}>
								{iconMovies}
								<Text style={styles.drawerListItemText}>
									내 주변 아이템
								</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.drawerListItem}>
							{iconTV}
							<Text style={styles.drawerListItemText} onPress={() => ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)}>
								도움말
							</Text>
						</View>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

NewDrawer.propTypes = {
	navigator: PropTypes.object
};

export default NewDrawer;
