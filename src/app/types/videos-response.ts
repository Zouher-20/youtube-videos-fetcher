import { PageInfo } from './page-info';
import { Video } from './video';

export interface VideosResponse {
  etag: string;
  items: Video[];
  kind: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  regionCode: string;
}
