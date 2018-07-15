import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { IndexComponent } from './index/index.component';
import { ObsControlComponent } from './obs-control/obs-control.component';
import { VodManageComponent } from './vod-manage/vod-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ObsControlComponent,
    VodManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
