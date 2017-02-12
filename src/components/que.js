import React from 'react';
import ReactBaseComponent from './reactBaseComponent';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements'

class Que extends ReactBaseComponent {
	constructor(props) {
		super(props);
	}

	render(){
		const { app, appActions } = this.props;
		const queNode = app.que.map((video, i) => (
			<ListItem
				key={i}
				hideChevron
				title={video.title}
				subtitle={`added by ${video.user.name}`}
				avatar={{uri: video.thumbnailUrl}}
				onPress={() => appActions.postPlayingVideo(video)}
			/>
		));

		return (
			<ScrollView>
				<List>{queNode}</List>
			</ScrollView>
		)
	}
}

Que.propTypes = {
	app: React.PropTypes.object,
	appActions: React.PropTypes.object,
};

export default Que;