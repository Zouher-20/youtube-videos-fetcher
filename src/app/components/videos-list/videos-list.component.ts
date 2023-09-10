import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from '../video-card/video-card.component';
import { Video } from '../../types/video';

@Component({
  selector: 'app-videos-list',
  standalone: true,
  imports: [CommonModule, VideoCardComponent],
  template: `
    <ul class="divide-y divide-slate-100">
      <li *ngFor="let video of videos">
        <app-video-card [video]="video"></app-video-card>
      </li>
    </ul>
  `,
})
export class VideosListComponent {
  @Input() videos!: Video[];
}
