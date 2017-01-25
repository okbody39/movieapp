import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import styles from './styles/CardTwo';
import { TMDB_IMG_URL } from '../../../constants/api';

const CardTwo = ({ info, viewItem }) => (
	<TouchableOpacity activeOpacity={0.8} onPress={viewItem.bind(this, info.productCode)}>
		<View style={styles.cardContainer}>
			<Image source={{ uri: info.image }} style={styles.cardImage} />
			<View style={styles.cardTitleContainer}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.productName}
				</Text>
				<Text style={styles.cardPrice} numberOfLines={1}>
					{info.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}원
				</Text>
			</View>
		</View>
	</TouchableOpacity>
);

CardTwo.propTypes = {
	info: PropTypes.object.isRequired,
	viewItem: PropTypes.func.isRequired
};

export default CardTwo;
