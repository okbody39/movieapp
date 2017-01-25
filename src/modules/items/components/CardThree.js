/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { TMDB_IMG_URL } from '../../../constants/api';
import styles from './styles/CardThree';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class CardThree extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { info, viewItem } = this.props;
		return (
			<View style={styles.cardContainer}>
				<TouchableOpacity activeOpacity={0.9} onPress={viewItem.bind(this, info.productCode)}>
					<View style={styles.card}>
						<Image source={{ uri: info.image }} style={styles.cardImage} />
						<View style={styles.cardDetails}>
							<Text
								style={styles.cardTitle}
								numberOfLines={3}>
								{info.productName}
							</Text>
							{/*<View style={styles.cardGenre}>*/}
								{/*<Text style={styles.cardGenreItem}>2016년 12월 24일</Text>*/}
							{/*</View>*/}
							<View style={styles.cardNumbers}>
								<View style={styles.cardStar}>
									<Text style={styles.cardPrice}>
										{info.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}원
									</Text>
								</View>
								<Text style={styles.cardRunningHours} />
							</View>
							<Text style={styles.cardDescription} numberOfLines={3}>
								제품 설명
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

CardThree.propTypes = {
	info: PropTypes.object.isRequired,
	viewItem: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		moviesGenres: state.items.genres
	};
}

export default connect(mapStateToProps, null)(CardThree);
