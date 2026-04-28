import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackingHome } from './pages/tracking-home/tracking-home';

const routes: Routes = [
  {
    path: '',
    component: TrackingHome
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackingRoutingModule {}
