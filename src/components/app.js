import React, { Component } from 'react'
import ReactBaseComponent from './reactBaseComponent';
import { StyleSheet, Text, View, TouchableOpacity, WebView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { SyncStates } from '../constants/app.js';
import { FIREBASE_CONFIG } from '../config/apiKey.js';
import Rebase from 're-base';
import ScrollTab from '../components/scrollTab.js';
import AppStyle from '../styles/app.js';
import * as AppActionCreator from '../actions/appActionCreators.js';
import YouTube from 'react-native-youtube';

const ref = 'session-seiya';
const base = Rebase.createClass(FIREBASE_CONFIG, ref);
const styles = StyleSheet.create(AppStyle);

class App extends ReactBaseComponent {
	constructor(props) {
		super(props);
	}

	componentWillMount(){
		const { appActions } = this.props;
		SyncStates.forEach((obj, i) => {
			const { state, asArray } = obj;
			base.fetch(state, { context: this, asArray, then(data) {
				appActions.updateSyncState(state, data);
			}});
		});
	}

	componentDidMount(){
		const { app, appActions } = this.props;
		base.listenTo('comments', { context: this, asArray: true, then(data) {
			appActions.updateComments(data);
		}});
		base.listenTo('que', { context: this, asArray: true, then(data) {
			appActions.updateQue(data);
		}});
		base.listenTo('currentTime', { context: this, asArray: false, then(data) {
			console.log(data);
			appActions.updateCurrentTime(data);
			this.player.seekTo(data);
		}});
		base.listenTo('playing', { context: this, asArray: false, then(data) {
			appActions.updatePlaying(data);
		}});
		base.listenTo('users', { context: this, asArray: true, then(data) {
			appActions.updateUsers(data);
		}});
		base.listenTo('playingVideo', { context: this, asArray: false, then(data) {
			appActions.updatePlayingVideo(data);
		}});
	}

	render() {
		const { app, appActions } = this.props;
		return (
			<View style={{flex: 1, marginTop: 20 }}>
				<YouTube style={{flex: 2}}
					ref={(player) => { this.player = player; }}
					videoId={app.playingVideo.id}
					play={app.playing}
					hidden={false}
					playsInline={true}
					loop={false}
					onReady={appActions.play}
					onChangeState={appActions.changePlayerState}
          onProgress={(e) => { appActions.progress(e.currentTime, e.duration) }}
					style={{alignSelf: 'stretch', height: 200, backgroundColor: 'black', marginVertical: 10}}
				/>
			  <ScrollTab style={{flex: 3}} app={app} appActions={appActions} />
			</View>
		);
	}
}

const mapStateToProps = (state) => ({
	app: state.app
});

const mapDispatchToProps = (dispatch) => ({
	appActions: bindActionCreators(AppActionCreator, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

