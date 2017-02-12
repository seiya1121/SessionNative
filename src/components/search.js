import React from 'react';
import ReactBaseComponent from './reactBaseComponent';
import { YoutubeApiUrl } from '../constants/app';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements'
import { YOUTUBE_API_KEY } from '../config/apiKey';

const BaseUrl = `https://www.googleapis.com/youtube/v3/search`;
const query = (text) => (
	`?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50&type=video&q=${text}`
);

const playlistItemsParams = (accessToken, playlistId) => (
  `access_token=${accessToken}&part=snippet&playlistId=${playlistId}&maxResults=50`
);

const videoObject = (video, user) => Object.assign(video, { user });

class Search extends ReactBaseComponent {
	constructor(props) {
		super(props);
		this.bind('getPlaylistVideos', 'onClickSetQue', 'onKeyPressForSearch');
	}

	searchVideo(text) {
		fetch(`${BaseUrl}/${query(text)}`)
			.then((response) => { return response.json(); })
			.then((result) => {
			  this.props.appActions.setSearchResult('search', result.items);
		  });
	}

	onKeyPressForSearch(e) {
		const searchFunc = (error, result) => {
			if (error) {
				console.log(error);
			} else {
				this.props.appActions.setSearchResult('search', result.items);
			}
		};
	  this.searchVideo(this.props.app.searchText);
		return true;
	}

  onClickSetQue(video) {
    const { que, currentUser, playingVideo } = this.props.app;
    const targetVideo = videoObject(video, currentUser);
    if (que.length === 0 && playingVideo.title === '') {
      this.props.appActions.postPlayingVideo(targetVideo);
    } else {
      this.props.appActions.pushVideo(targetVideo);
    }
  }

  getPlaylistVideos(playlistId) {
    const { accessToken } = this.props.app.currentUser;
    fetch(`${YoutubeApiUrl}/playlistItems?${playlistItemsParams(accessToken, playlistId)}`)
      .then((response) => response.json())
      .then((result) => this.props.appActions.setSearchResult('playlistVideo', result))
  }

  render(){
    const { app, appActions } = this.props;

    const videoResult = (result, i) => (
			<ListItem
				key={i}
				roundAvatar
				hideChevron
				title={result.title}
				avatar={{uri: result.thumbnailUrl}}
				onPress={() => this.onClickSetQue(result)}
			/>
    );

    const resultNode = app.searchResult.map((result, i) => (
      (result.type === 'video') ? videoResult(result, i) : listResult(result, i)
    ));

    return (
    	<View>
				<SearchBar
					noIcon
					lightTheme
					onChangeText={(text) => { appActions.changeValueWithKey('searchText', text); }}
					placeholder='Type Here...'
					onSubmitEditing={this.onKeyPressForSearch}
				/>
				<ScrollView><List>{resultNode}</List></ScrollView>
			</View>
    )
  }
}

Search.propTypes = {
  app: React.PropTypes.object,
  appActions: React.PropTypes.object,
};

export default Search;
