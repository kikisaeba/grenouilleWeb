import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from "./index/index.component";
import { ObsControlComponent } from "./obs-control/obs-control.component"
import { VodManageComponent } from "./vod-manage/vod-manage.component";
import { UserControlComponent } from "./user-control/user-control.component";
import {StatsCsvComponent} from "./stats-csv/stats-csv.component";
import {StatsSceneComponent} from "./stats-scene/stats-scene.component";
import {StatsSceneControlComponent} from "./stats-scene-control/stats-scene-control.component";

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index',  component: IndexComponent },
  { path: 'user/manage',  component: UserControlComponent },
  { path: 'obs/control',  component: ObsControlComponent },
  { path: 'vod/manage',  component: VodManageComponent},
  { path: 'stats/csv',  component: StatsCsvComponent},
  { path: 'stats/scene',  component: StatsSceneComponent},
  { path: 'stats/scene/control',  component: StatsSceneControlComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
