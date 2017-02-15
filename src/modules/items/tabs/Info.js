import React, { PropTypes } from 'react';
import {
	Text,
	Image,
	Dimensions,
	WebView,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
// import FitImage from 'react-native-fit-image';

import styles from './styles/Info';

const Info = ({ info }) => {
	// const director = _.filter(info.casts.crew, { department: 'Directing', job: 'Director' });
	// const releaseDate = moment(info.release_date).format('LL');
	// const budget = (info.budget === 0 ? 'n/a' : numeral(info.budget).format('$ 0,0'));

	// console.log(info.detail[0]);info.detail[0]

	const width = Dimensions.get('window').width;
	const height = Dimensions.get('window').height;

	var concatHTML = "<img src='"+info.detail[0]+"' style='width:"+(width-50)+"px'>";

	return (
		<View style={[styles.container,{width: width, height: height}]} >
			<WebView
				//style={{
					//flex: 1,
				//	height: height
				//}}
				source={{ html: concatHTML, baseUrl: 'web/' }}
				//source={{uri: 'http://www.naver.com'}}
				//injectedJavaScript="document.body.scrollHeight;"
				//onNavigationStateChange={this._updateWebViewHeight.bind(this)}
				// javaScriptEnabled={true}
			/>
		</View>
	);
};

Info.propTypes = {
	info: PropTypes.object.isRequired,
	//getTabHeight: PropTypes.func.isRequired
};

export default Info;
