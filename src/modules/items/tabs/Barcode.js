import React, { PropTypes } from 'react';
import {
	Text,
	View,
	Image
} from 'react-native';

import QRCode from 'react-native-qrcode';

import styles from './styles/Barcode';
import { TMDB_IMG_URL } from '../../../constants/api';

const Barcode = ({ info }) => {

	return (
		<View style={styles.container}>
			<View style={{height: 200, width: 200, backgroundColor: 'white', justifyContent: 'center',
		alignItems: 'center',}}>
				<QRCode
					value='http://facebook.github.io/react-native/'
					size={180}
					bgColor='black'
					fgColor='white'/>
			</View>
		</View>
	);
};

Barcode.propTypes = {
	info: PropTypes.object.isRequired,
	//getTabHeight: PropTypes.func.isRequired
};

export default Barcode;
