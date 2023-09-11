export class FetchVideosData {
  static readonly type = '[Videos] FetchData';
  constructor(public payload: { channelId: string }) {}
}

export class SetVideoNote {
  static readonly type = '[Videos] SetVideoNote';
  constructor(public payload: { id: string; note: string }) {}
}
