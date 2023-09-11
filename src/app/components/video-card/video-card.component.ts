import { Component, Input } from '@angular/core';
import { Video } from '../../types/video';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Store } from '@ngxs/store';
import { SetVideoNote } from 'src/app/store/videos.actions';
@Component({
  selector: 'app-video-card',
  standalone: true,
  styleUrls: ['./video-card.component.css'],
  template: `
    <article
      class="flex w-full items-center space-x-6 p-3 hover:bg-slate-200 rounded-xl transition-colors"
    >
      <img
        [src]="video.snippet.thumbnails.default.url"
        [alt]="video.snippet.title + ' video thumbnail'"
        class="flex-none rounded-md video-thumbnail bg-slate-100"
      />
      <div class="relative flex-col flex-grow overflow-hidden">
        <h2 class="font-semibold  text-slate-900 truncate ">
          {{ video.snippet.title }}
        </h2>
        <time>
          <small class="text-slate-400 text-xs">
            {{ formatDate(video.snippet.publishedAt) }}
          </small>
        </time>
        <p class="text-slate-700 flex-none w-full mt-2  text-xs lg:text-base">
          {{ video.snippet.description }}
        </p>
        <input
          type="text"
          id="note"
          name="note"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none  focus:border-red-500 transition w-52 m-1 p-2"
          required
          placeholder="note"
          (input)="onInputChange($event)"
          [value]="video.note || ''"
        />
      </div>
    </article>
  `,
})
export class VideoCardComponent {
  @Input() video!: Video;
  constructor(public store: Store) {
    dayjs.extend(relativeTime);
  }
  formatDate(date: string) {
    return dayjs(date).fromNow();
  }
  onInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.store.dispatch(
      new SetVideoNote({ id: this.video.id.videoId, note: target.value })
    );
  }
}
