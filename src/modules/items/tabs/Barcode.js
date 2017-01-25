import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

import QRCode from 'react-native-qrcode';

import styles from './styles/Barcode';
import { TMDB_IMG_URL } from '../../../constants/api';

const Barcode = ({ info, getTabHeight }) => {
	let computedHeight = 200;

	return (
		<View style={styles.container} onLayout={getTabHeight.bind(this, 'casts', computedHeight)}>
			<QRCode
				value='http://facebook.github.io/react-native/'
				size={200}
				bgColor='#A5C419'
				fgColor='white'/>
		</View>
	);
};

Barcode.propTypes = {
	info: PropTypes.object.isRequired,
	getTabHeight: PropTypes.func.isRequired
};

export default Barcode;
