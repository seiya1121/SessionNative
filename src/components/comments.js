import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ReactBaseComponent from './reactBaseComponent';
import { CommandType, CommentType, commentObj } from '../constants/app';
import { List, ListItem, SearchBar } from 'react-native-elements'
import Avatar from '../images/avatar.png'

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
    const comments = app.comments.slice(app.comments.length - 9, app.comments.length);
    const commentWithIcon = (comment, i) => {
    	const avatar = (comment.user.isAnonymous) ? Avatar : {uri: comment.user.photoURL}
			return (
				<ListItem key={i} hideChevron roundAvatar title={comment.content} avatar={avatar}/>
			);
		}
    const commentWithoutIcon = (comment, i) => (
			<ListItem key={i} hideChevron roundAvatar title={comment.content} />
		);
    const commentsNode = comments.map((c, i) => (
    	(c.user.photoURL === '') ? commentWithoutIcon(c, i) : commentWithIcon(c, i)
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
