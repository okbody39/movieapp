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
	chartContainer: {
		//...StyleSheet.absoluteFillObject,
		//position: 'absolute',
		marginTop: 5,
		height: 150,
		// right: 16,
		// left: 16,
		// flexDirection: 'row'
		backgroundColor: '#0a0a0a',
	},
	chartContainer2: {
		//...StyleSheet.absoluteFillObject,
		//position: 'absolute',
		marginTop: 10,
		height: 200,
		// right: 16,
		// left: 16,
		// flexDirection: 'row'
		backgroundColor: '#0a0a0a',
	},
	progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	seperator: {
		marginTop: 10,
		backgroundColor: '#8E8E8E'
	},
	// chart: {
	// 	...StyleSheet.absoluteFillObject,
	// 	backgroundColor: 'transparent',
	// 	top: 0
	// }
	browseList: {
		marginTop: 30,
		paddingHorizontal: 16,
		marginBottom: 30
	},
	browseListItem: {
		...Platform.select({
			ios: {
				paddingVertical: 8
			},
			android: {
				paddingVertical: 10
			}
		}),
		flexDirection: 'row'
	},
	browseListItemText: {
		flex: 1,
		color: 'white',
		paddingLeft: 10,
		...Platform.select({
			ios: {
				fontSize: 15,
				fontWeight: '500'
			},
			android: {
				fontSize: 16,
				fontWeight: '100'
			}
		})
	},
	viewButton: {
		justifyContent: 'center',
		padding: 10,
		borderRadius: 3,
		backgroundColor: '#EA0000',
		width: 100,
		height: 30,
		marginTop: 10
	},
	viewButtonText: {
		color: 'white'
	},
});

export default styles;
