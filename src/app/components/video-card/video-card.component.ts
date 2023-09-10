import { Component, Input } from '@angular/core';
import { Video } from '../../types/video';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
@Component({
  selector: 'app-video-card',
  standalone: true,
  styleUrls: ['./video-card.component.css'],
  template: `
    <article class="flex w-full items-center space-x-6 p-6">
      <img
        [src]="video.snippet.thumbnails.medium.url"
        alt=""
        class="flex-none rounded-md video-thumbnail bg-slate-100"
      />
      <div class="relative flex-col w-full">
        <h2 class="font-semibold  text-slate-900 truncate ">
          {{ video.snippet.title }}
        </h2>
        <time>
          <small class="text-slate-400">
            {{ formatDate(video.snippet.publishedAt) }}
          </small>
        </time>
        <p class="text-slate-700 flex-none w-full mt-2  text-sm">
          {{ video.snippet.description }}
        </p>
      </div>
    </article>
  `,
})
export class VideoCardComponent {
  @Input() video!: Video;
  constructor() {
    dayjs.extend(relativeTime);
  }
  formatDate(date: string) {
    return dayjs(date).fromNow();
  }
}
