import * as App from '../constants/app.js';

const resultObj = (item, resultType) => {
  switch (resultType) {
    case 'search':
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        type: 'video',
      };
    case 'playlistVideo':
      const { resourceId, title, thumbnails } = item.snippet;
      return { id: resourceId.videoId, title, thumbnailUrl: thumbnails.default.url, type: 'video' };
    case 'playlist':
      const { id, thumbnailUrl } = item;
      return { id, title: item.title, thumbnailUrl, type: 'list', };
    default:
      return {};
  }
}

export const app = (state = App.InitialState, action) => {
  const newState = (obj) => Object.assign({}, state, obj);
  switch (action.type) {
    case App.CHANGE_VALUE_WITH_KEY:
      return newState({ [action.key]: action.value });
    case App.POST_PLAYING_VIDE:
      return state;
    case App.REMOVE_VIDEO:
      return state;
    case App.PLAY:
      return state;
    case App.PAUSE:
      return state;
    case App.PLAY_PAUSE:
      return state;
    case App.POST_USER:
      return state;
    case App.REMOVE_USER:
      return state;
    case App.SET_USER:
      return newState({ currentUser: action.user });
    case App.SET_PLAYLISTS:
      return newState({ playlists: action.playlists });
    case App.ADD_COMMENT:
      return newState({ commentText: '', isCommentActive: false });
    case App.CHANGE_PLAYED:
      return newState({ played: action.played, seeking: false });
		case App.CHANGE_PLAYER_STATE:
			return newState({ state })
    case App.PROGRESS:
      const { currentTime, duration } = action;
      return newState({ currentTime, duration });
    case App.SET_SEARCH_RESULT:
      const { result, resultType } = action;
      const tempResult = (resultType === 'playlistVideo') ?
        result.items.filter((item) => item.snippet.title !== "Deleted video") : result;
      return newState({ searchResult: tempResult.map((item) =>  resultObj(item, resultType)) });
    case App.UPDATE_SYNC_STATE:
      return newState({ [action.key]: action.value });
    case App.UPDATE_QUE:
      return newState({ que: action.que });
    case App.UPDATE_COMMENTS:
      return newState({ comments: action.comments });
    case App.UPDATE_CURRENT_TIME:
      return newState({ currentTime: action.currentTime });
    case App.UPDATE_PLAYING:
      return newState({ playing: action.playing });
    case App.UPDATE_PLAYING_VIDEO:
    const playingVideo = Object.keys(action.video).length === 0 ? App.DefaultVideo : action.video;
      return newState({
        playing: true,
        startTime: 0,
        playingVideo,
        que: state.que.filter((item) => item.key !== playingVideo.key),
      });
    case App.UPDATE_USERS:
      return newState({ users: action.users });
    case App.UPDATE_SEARCH_RESULT:
      return newState({ searchResult: app.lists, isSearchActive: true });
    default:
      return state;
  }
};