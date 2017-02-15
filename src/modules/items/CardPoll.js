import React, { PropTypes, Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemsActions from './items.actions';

import SwipeCards from 'react-native-swipe-cards';

import styles from './styles/CardPoll';

let Card = React.createClass({
	render() {
		return (
			<View style={styles.card}>
				{/*<Image style={styles.thumbnail} source={{uri: this.props.image}} />*/}
				<Text style={styles.text}>{this.props.text}</Text>
			</View>
		)
	}
})

let NoMoreCards = React.createClass({
	render() {
		return (
			<View style={styles.card}>
				<Text style={styles.text}>수고 하셨습니다.</Text>
			</View>
		)
	}
})

const Cards = [
	{text: '본인의 소득에 만족합니까?', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'},
	{text: '일반적으로 스트레스를 많이 받는 편입니까?', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
	{text: '충분한 수면을 취하지 못한다고 생각합니까?', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
	{text: '문화여가를 정기적으로 하는 편입니까?', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
	{text: '평소 현재 거주하는 주택에서 소음으로 인한 스트레스를 받는 편입니까?', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
]

class CardPoll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false,
			cards: Cards,
			outOfCards: false
			//currentPage: 1,
			//nearItems: [],
		};

		// this._viewItem = this._viewItem.bind(this);
		// this._onRefresh = this._onRefresh.bind(this);

		this.handleYup = this.handleYup.bind(this);
		this.handleNope = this.handleNope.bind(this);
		//this.cardRemoved = this.cardRemoved.bind(this);

		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveItemsList();
	}

	_retrieveItemsList(isRefreshed) {

		console.log('... _retrieveItemsList ...');

		this.props.actions.retrieveNearItems()
			.then(() => {

				// console.log('==========================');
				// console.log(this.props.nearItems);
				// console.log('==========================');

				// const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
				// const dataSource = ds.cloneWithRows(this.props.nearItems);
				this.setState({
					nearItems: this.props.nearItems,
					// dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
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

	handleYup (card) {
		console.log("yup")
	}

	handleNope (card) {
		console.log("nope")
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textBox}>
					<Text style={styles.helpText}>
						아래 카드를 좌우로 넘기면서 설문하시면 됩니다.
					</Text>
					<Text style={styles.helpText}>
						좌측으로 넘기면 "아니다", ,{'\n'}우측으로 넘기면 "그렇다".
					</Text>
				</View>
				<SwipeCards
					cards={this.state.cards}
					loop={false}

					renderCard={(cardData) => <Card {...cardData} />}
					renderNoMoreCards={() => <NoMoreCards />}
					showYup={true}
					showNope={true}

					onClickHandler={() => console.log('tap') }

					handleYup={this.handleYup}
					handleNope={this.handleNope}

					//renderYup={}
					//renderNope={}

					yupText="그렇다"
					nopeText="아니다"

					// yupView=
					// yupStyle={{
					// 	borderColor: 'green',
					// 	borderWidth: 0,
					// 	position: 'absolute',
					// 	padding: 20,
					// 	bottom: 20,
					// 	borderRadius: 5,
					// 	right: 20,
					// }}
					// yupTextStyle={{
					// 	fontSize: 18,
					// 	fontWeight: '500',
					// 	color: 'green',
					// }}
					// nopeStyle={{
					// 	borderColor: 'red',
					// 	borderWidth: 0,
					//	position: 'absolute',
					//	bottom: 20,
					//	padding: 20,
					//	borderRadius: 5,
					//	left: 20,
					// }}
					// nopeTextStyle={{
					//	fontSize: 18,
					//	fontWeight: '500',
					//	color: 'red',
					// }}

					// cardRemoved={this.cardRemoved}
				/>
			</View>
		)
	}
}

let rightButtons = [];

if (Platform.OS === 'ios') {
	rightButtons = [
		{
			id: 'close',
			title: 'Close'
		}
	];
}

CardPoll.navigatorButtons = {
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

CardPoll.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		//nearItems: state.items.nearItems
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(itemsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPoll);

