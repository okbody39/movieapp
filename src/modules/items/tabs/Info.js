import React, { PropTypes } from 'react';
import {
	Text,
	Image,
	Dimensions,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import FitImage from 'react-native-fit-image';

import styles from './styles/Info';

const Info = ({ info }) => {
	// const director = _.filter(info.casts.crew, { department: 'Directing', job: 'Director' });
	// const releaseDate = moment(info.release_date).format('LL');
	// const budget = (info.budget === 0 ? 'n/a' : numeral(info.budget).format('$ 0,0'));

	// console.log(info.detail[0]);info.detail[0]

	// const width = Dimensions.get('window').width-32;
	// const height = Dimensions.get('window').height;


	return (
		<View style={styles.container}>
			<FitImage
				style={styles.detail}
				originalWidth={350}
				originalHeight={1996}
				source={{ uri: info.detail[0] }}
			/>
			{/*<Image source={{ uri: info.detail[0] }} resizeMode='cover' style={[styles.detail,{overflow: 'visible'}]} />*/}
		</View>
	);
};

Info.propTypes = {
	info: PropTypes.object.isRequired
};

export default Info;
