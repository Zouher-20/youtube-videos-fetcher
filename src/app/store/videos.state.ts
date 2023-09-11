import { State, Action, StateContext } from '@ngxs/store';
import { FetchVideosData, SetVideoNote } from '../store/videos.actions';
import { VideosResponse } from '../types/videos-response';
import { Video } from '../types/video';

@State<VideosResponse>({
  name: 'videos',
  defaults: {
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0,
    },
    etag: '',
    items: JSON.parse(localStorage.getItem('videos') || '[]'),
    kind: '',
    nextPageToken: '',
    regionCode: '',
  },
})
export class VideosState {
  url = (channelId: string) =>
    `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC5JXYLNjal33FMIDhZY7pmlTinketMIms&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`;

  @Action(FetchVideosData)
  async FetchVideosData(
    store: StateContext<VideosResponse>,
    action: FetchVideosData
  ) {
    var data = null;
    try {
      const response = await fetch(`${this.url(action.payload.channelId)}`);
      data = await response.json();
    } catch (error) {
      console.log('There was an error', error);
    }

    if (data) {
      store.patchState(data);
      localStorage.setItem('videos', JSON.stringify(data.items));
    }
  }

  @Action(SetVideoNote)
  async SetVideoNote(
    store: StateContext<VideosResponse>,
    action: SetVideoNote
  ) {
    var clone: Video[] = JSON.parse(JSON.stringify(store.getState().items));
    const indexToPatch = clone.findIndex(
      (video: Video) => video.id.videoId === action.payload.id
    );
    clone[indexToPatch].note = action.payload.note;
    localStorage.setItem('videos', JSON.stringify(clone));
  }
}
