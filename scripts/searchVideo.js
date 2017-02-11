import { YOUTUBE_API_KEY } from '../config/apiKey';

const BaseUrl = `https://www.googleapis.com/youtube/v3/search`;
const query = (text) => (
  `?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50&type=video&q=${text}`
);

export const searchVideo = () => {
	fetch(`${BaseUrl}/${query(text)}`).then((result) => )
}