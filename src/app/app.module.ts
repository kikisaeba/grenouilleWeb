import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSlideToggleModule, MatRadioModule, } from "@angular/material";

import {AppComponent} from './app.component';
import {AppRoutingModule} from './/app-routing.module';
import {IndexComponent} from './index/index.component';
import {ObsControlComponent} from './obs-control/obs-control.component';
import {VodManageComponent} from './vod-manage/vod-manage.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {UserControlComponent} from './user-control/user-control.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ObsControlComponent,
    VodManageComponent,
    SidebarComponent,
    UserControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatSlideToggleModule, MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
