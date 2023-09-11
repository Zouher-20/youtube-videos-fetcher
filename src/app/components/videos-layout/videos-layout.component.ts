import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosListComponent } from '../videos-list/videos-list.component';
import { Video } from '../../types/video';
import { Store } from '@ngxs/store';
import { FetchVideosData } from 'src/app/store/videos.actions';
@Component({
  selector: 'app-videos-layout',
  standalone: true,
  imports: [CommonModule, VideosListComponent],
  template: `
    <section class="  flex flex-col  items-center w-full ">
      <h1 class=" font-bold text-2xl mb-6 text-red-800">
        Youtube Channel Viewer
      </h1>
      <form id="searchForm" (submit)="fetchVideos($event)" class="ps-5 mb-4">
        <div class="flex gap-4">
          <input
            type="text"
            id="channel-id"
            name="channelId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none  focus:border-red-500 focus:border-2 transition  w-64 p-2"
            required
            placeholder="channel id"
          />
          <button
            type="submit"
            class="text-white  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            fetch
          </button>
        </div>
        <small class="text-xs text-slate-500"
          >ex : UCW5YeuERMmlnqo4oq8vwUpg</small
        >
      </form>
      <app-videos-list class="w-full" [videos]="videos" />
    </section>
  `,
})
export class VideosLayoutComponent {
  videos: Video[] = [];
  constructor(private store: Store) {
    this.store
      .select((state) => state.videos.items)
      .subscribe((data) => {
        this, (this.videos = data);
      });
  }

  fetchVideos(e: SubmitEvent) {
    e.preventDefault();
    const form = document.getElementById('searchForm') || null;
    if (form instanceof HTMLFormElement) {
      const channelId = new FormData(form).get('channelId');
      if (channelId)
        this.store.dispatch(
          new FetchVideosData({ channelId: channelId.toString() })
        );
    }
  }
}
