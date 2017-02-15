import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0a0a0a',
		...Platform.select({
			ios: {
				paddingTop: 83
			}
		})
	},
	textBox: {
		// flex: 1,
		padding: 10,
	},
	helpText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
	card: {
		borderWidth: 5,
		borderColor: '#7CB5EC',
		alignItems: 'center',
		borderRadius: 5,
		overflow: 'hidden',
		// borderColor: 'grey',
		backgroundColor: 'white',
		// borderWidth: 1,
		elevation: 1,
		width: 300,
		height: 200,
		padding: 20,
	},
	thumbnail: {
		flex: 1,
		width: 300,
		height: 300,
	},
	text: {
		color: 'black',
		fontSize: 20,
		fontWeight: '500',
		paddingTop: 10,
		paddingBottom: 10
	},
	noMoreCards: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default styles;
