import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ReactBaseComponent from './reactBaseComponent';
import { CommandType, CommentType, commentObj } from '../constants/app';
import { List, ListItem, SearchBar } from 'react-native-elements'

class Comments extends ReactBaseComponent {
  constructor(props) {
    super(props);
		this.bind('onKeyPressForComment');
  }

	onKeyPressForComment(e) {
  	const text = e.nativeEvent.text;
		if (text === '') return false;
		const comment = commentObj(
			text,
			this.props.app.currentUser,
			CommentType.text,
			''
		);
		this.props.appActions.addComment(comment);
		return true;
	};

  render() {
    const {app, appActions} = this.props;
    const commentsNode = app.comments.slice(app.comments.length - 9, app.comments.length).map((comment, i) => (
			<ListItem
				key={i}
				hideChevron
				roundAvatar
				title={comment.content}
				avatar={{uri: comment.user.photoURL}}
			/>
		));

    return(
    	<View>
				<SearchBar
					noIcon
					lightTheme
					onChangeText={(text) => { appActions.changeValueWithKey('commentText', text); }}
					placeholder='Type Here...'
					onSubmitEditing={this.onKeyPressForComment}
				/>
				<ScrollView><List>{commentsNode}</List></ScrollView>
			</View>
    )
  }
}

Comments.propTypes = {
  app: React.PropTypes.object,
  appActions: React.PropTypes.object,
};

export default Comments;
