import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { ObsControlComponent } from "./obs-control/obs-control.component"
import { VodManageComponent } from "./vod-manage/vod-manage.component";
import { UserControlComponent } from "./user-control/user-control.component";

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexComponent },
  { path: 'user_control',  component: UserControlComponent },
  { path: 'obs_control',  component: ObsControlComponent },
  { path: 'vod_manage',  component: VodManageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
