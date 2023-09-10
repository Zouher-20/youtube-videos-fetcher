import { State, Action, StateContext } from '@ngxs/store';
import { FetchVideosData } from '../store/videos.actions';
import { VideosResponse } from '../types/videos-response';

@State<VideosResponse>({
  name: 'videos',
  defaults: {
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0,
    },
    etag: '',
    items: [],
    kind: '',
    nextPageToken: '',
    regionCode: '',
  },
})
export class VideosState {
  url = (channelId: string, pageSize: number) =>
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC5JXYLNjal33FMIDhZY7pmlTinketMIms&channelId=${channelId}&part=snippet,id&order=date&maxResults=${pageSize}`;

  @Action(FetchVideosData)
  async FetchVideosData(store: StateContext<number>, action: FetchVideosData) {
    var data = null;
    try {
      const response = await fetch(`${this.url(action.payload.channelId, 20)}`);
      data = await response.json();
    } catch (error) {
      console.log('There was an error', error);
    }

    if (data) {
      console.log(data);
      store.setState(data);
    }
  }
}
