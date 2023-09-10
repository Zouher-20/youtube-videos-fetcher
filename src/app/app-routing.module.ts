import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosLayoutComponent } from './components/videos-layout/videos-layout.component';

const routes: Routes = [{ path: '', component: VideosLayoutComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
