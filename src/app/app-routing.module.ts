import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { ObsControlComponent } from "./obs-control/obs-control.component"
import { VodManageComponent } from "./vod-manage/vod-manage.component";
import { UserControlComponent } from "./user-control/user-control.component";
import {StatsCsvComponent} from "./stats-csv/stats-csv.component";
import {StatsGlobalComponent} from "./stats-global/stats-global.component";
import {StatsSceneComponent} from "./stats-scene/stats-scene.component";

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexComponent },
  { path: 'user_scope',  component: UserControlComponent },
  { path: 'obs_control',  component: ObsControlComponent },
  { path: 'vod_manage',  component: VodManageComponent},
  { path: 'stats_csv',  component: StatsCsvComponent},
  { path: 'stats_global',  component: StatsGlobalComponent},
  { path: 'stats_scene',  component: StatsSceneComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
