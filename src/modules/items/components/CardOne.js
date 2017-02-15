import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from './styles/CardOne';
import { TMDB_IMG_URL } from '../../../constants/api';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);

const iconUp = (<Icon name="md-arrow-dropup" size={16} color="#3C78B5" />);
const iconDown = (<Icon name="md-arrow-dropdown" size={16} color="#BF4C5D" />);
const iconSame = (<Icon name="md-remove" size={16} color="gray" />);

const CardOne = ({ info, viewItem }) => (
	<View>
		<Image source={{ uri: info.image }} style={styles.imageBackdrop} />
		<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
		<View style={styles.cardContainer}>
			<AnimatedCircularProgress
				size={150}
				width={30}
				fill={info.value*20}
				tintColor="#00e0ff"
				backgroundColor="#3d5875">
				{
					(fill) => (
						<Text style={styles.points}>
							{ info.value }
						</Text>
					)
				}
			</AnimatedCircularProgress>
			{/*<Image source={{ uri: info.image }} style={styles.cardImage} />*/}
			<View style={styles.cardDetails}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.name}
				</Text>
				<View style={styles.cardGenre}>
					<Text style={styles.cardGenreItem}>{info.key}</Text>
				</View>
				<View style={styles.cardNumbers}>
					<View style={styles.cardStar}>
						{ info.diff > 0 ?
							<Icon name="md-arrow-dropup" size={20} color="#3C78B5" />
							:
							info.diff == 0 ?
								<Icon name="md-remove" size={16} color="gray" />
								:
								<Icon name="md-arrow-dropdown" size={20} color="#BF4C5D" />
						}
						<Text style={styles.cardStarRatings}>{info.diff}</Text>
					</View>
					<Text style={styles.cardRunningHours} />
				</View>
				<Text style={styles.cardDescription} numberOfLines={3}>
					{info.description}
				</Text>
				<TouchableOpacity activeOpacity={0.9} onPress={viewItem.bind(this, info.key, info)}>
					<View style={styles.viewButton}>
						<Text style={styles.viewButtonText}>자세히 보기</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	</View>
);

CardOne.propTypes = {
	info: PropTypes.object.isRequired,
	viewItem: PropTypes.func.isRequired
};

export default CardOne;
