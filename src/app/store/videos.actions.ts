export class FetchVideosData {
  static readonly type = '[Videos] FetchData';
  constructor(public payload: { channelId: string }) {}
}
