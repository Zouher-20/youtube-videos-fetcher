import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../../types/video';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-videos-list',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  template: `
    <ul id="videos-list" class="divide-y divide-slate-100">
      <li *ngFor="let video of videos">
        <app-video-card [video]="video"></app-video-card>
      </li>
    </ul>
  `,
})
export class VideosListComponent implements AfterViewInit {
  @Input() videos!: Video[];
  sortable: Sortable | null = null;
  constructor() {}
  ngAfterViewInit(): void {
    var el = document.getElementById('videos-list');
    if (el) {
      var sortable = Sortable.create(el, {
        animation: 150,
        store: {
          get: function () {
            var order = localStorage.getItem('order');
            return order ? order.split('|') : [];
          },
          set: function (sortable: Sortable) {
            var order = sortable.toArray();
            localStorage.setItem('order', order.join('|'));
          },
        },
      });

      var oldOrder = localStorage.getItem('order')?.split('|') || [];
      sortable.sort(oldOrder);
    }
  }
}
