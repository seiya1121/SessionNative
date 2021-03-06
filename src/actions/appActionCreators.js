import * as App from '../constants/app.js';
import { FIREBASE_CONFIG } from '../config/apiKey.js';
import Rebase from 're-base';

const ref = 'session-seiya';
const base = Rebase.createClass(FIREBASE_CONFIG, ref);

const push = (stateName, data) => base.push(stateName, { data });
const post = (stateName, data) => base.post(stateName, { data });
const remove = (endPoint) => base.remove(endPoint);

// sync系
export const postPlayingVideo = (video) => {
  if (video) {
    post('playingVideo', video);
    post('startTime', 0);
    remove(`que/${video.key}`);
    const comment = App.commentObj(`# ${video.title}`, video.user, App.CommentType.log, '');
    push('comments', comment);
  } else {
    post('playingVideo', App.DefaultVideo);
    post('startTime', 0);
  }
  return { type: App.POST_PLAYING_VIDEO };
};
export const postUser = (uid, user) => {
  post(`users/${uid}`, user);
  return { type: App.POST_USER };
};
export const removeUser = (uid) => {
  remove(`users/${uid}`);
  return { type: App.REMOVE_USER };
}
export const pushVideo = (video) => {
  push('que', video);
  return { type: App.PUSH_VIDEO };
};
export const addComment = (comment) => {
  push('comments', comment);
  return { type: App.ADD_COMMENT };
};
export const removeVideo = (video) => {
  remove(`que/${video.key}`);
  return { type: App.REMOVE_VIDEO };
};
export const changePlayed = (played) => {
  post('startTime', played);
  return { type: App.CHANGE_PLAYED, played };
};
export const play = () => ({ type: App.PLAY });
export const pause = (startTime) => {
  post('startTime', startTime);
  return { type: App.PAUSE };
};
export const playPause = (isPlaying) => {
  post('playing', !isPlaying);
  return { type: App.PLAY_PAUSE };
};

// local系
export const changeValueWithKey = (key, value) => ({ type: App.CHANGE_VALUE_WITH_KEY, key, value });
export const setUser = (user) => ({ type: App.SET_USER, user });
export const setPlaylists = (playlists) => ({ type: App.SET_PLAYLISTS, playlists });
export const setSearchResult = (resultType, result) => ({
  type: App.SET_SEARCH_RESULT, result, resultType
});
export const changePlayerState = (event) => ({ type: App.CHANGE_PLAYER_STATE, event });
export const seekDown = () => ({ type: App.SEEK_DOWN });
export const progress = (currentTime, duration) => ({ type: App.PROGRESS, currentTime, duration });
export const updateSyncState = (key, value) => ({ type: App.UPDATE_SYNC_STATE, key, value });
export const updateQue = (que) => ({ type: App.UPDATE_QUE, que });
export const updateComments = (comments) => ({ type: App.UPDATE_COMMENTS, comments });
export const updateCurrentTime = (currentTime) => ({ type: App.UPDATE_CURRENT_TIME, currentTime });
export const updatePlaying = (playing) => ({ type: App.UPDATE_PLAYING, playing });
export const updatePlayingVideo = (video) => ({ type: App.UPDATE_PLAYING_VIDEO, video });
export const updateUsers = (users) => ({ type: App.UPDATE_USERS, users });
export const setPlaylistToResult = (results) => ({ type: App.UPDATE_SEARCH_RESULT, results });
