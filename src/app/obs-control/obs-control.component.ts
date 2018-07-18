import {Component, OnInit} from '@angular/core';
import {TokensService} from "../tokens.service";
import {HttpClient} from "@angular/common/http";

import {APIResult, APIResultOBSSceneList, APIResultOBSStatus} from "../APIResults/APIResults";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-obs-control',
  templateUrl: './obs-control.component.html',
  styleUrls: ['./obs-control.component.css']
})
export class ObsControlComponent implements OnInit {

  statusStreaming: boolean = false;
  statusRecording: boolean = false;
  scenes: string[] = [];
  activeScene: string = '';

  statusStreamingUI: boolean = false;
  statusRecordingUI: boolean = false;
  activeSceneUI: string = '';

  error_text = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokensService
  ) {}

  ngOnInit() {
    if (this.tokenService.refreshToken == undefined) {
      this.router.navigate(['/index']);
      return;
    }
    if (this.tokenService.authToken != undefined)
      this.refreshUI();
    this.tokenService.newAuthToken.subscribe(isValid => {
      if (isValid) {
        this.refreshUI();
      } else {
        this.resetUI();
      }
    });
  }

  resetUI() {
    this.statusStreaming = false;
    this.statusRecording = false;
    this.scenes = [];
    this.activeScene = '';
    this.statusStreamingUI = false;
    this.statusRecordingUI = false;
    this.activeSceneUI = '';
    this.error_text = undefined;
  }

  refreshUI() {
    this.error_text = undefined;
    this.updateSceneList();
    this.updateOBSStatus();
  }

  updateSceneList() {
    this.http.get<APIResult>(environment.baseUrl + '/api/obs/scene/list', this.tokenService.getAuthTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultOBSSceneList> json.payload);
        this.activeScene = payload.active_scene;
        this.activeSceneUI = payload.active_scene;
        this.scenes = payload.scenes;
      } else {
        this.error_text = json.error;
      }
    });
  }

  changeScene() {
    let payload = { 'scene': this.activeSceneUI };
    this.http.post<APIResult>(environment.baseUrl + '/api/obs/scene/update', payload , this.tokenService.getAuthTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        this.activeScene = this.activeSceneUI;
      } else {
        this.activeSceneUI = this.activeScene;
        this.error_text = json.error;
      }
    });
  }

  updateOBSStatus() {
    this.http.get<APIResult>(environment.baseUrl + '/api/obs/status', this.tokenService.getAuthTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultOBSStatus> json.payload);
        this.statusRecordingUI = payload.recording;
        this.statusRecording = payload.recording;
        this.statusStreamingUI = payload.streaming;
        this.statusStreaming = payload.streaming;
      } else {
        this.error_text = json.error;
      }
    });
  }

  changeStreaming() {
    let url = 'stop';
    if (this.statusStreamingUI)
      url = 'start';

    let payload = {};
    this.http.post<APIResult>(environment.baseUrl + '/api/obs/stream/' + url, payload , this.tokenService.getAuthTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        this.statusStreaming = this.statusStreamingUI;
      } else {
        this.statusStreamingUI = this.statusStreaming;
        this.error_text = json.error;
      }
    });
  }

  changeRecording() {
    let url = 'stop';
    if (this.statusRecordingUI)
      url = 'start';

    let payload = {};
    this.http.post<APIResult>(environment.baseUrl + '/api/obs/record/' + url, payload , this.tokenService.getAuthTokenHeader()).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        this.statusRecording = this.statusRecordingUI;
      } else {
        this.statusRecordingUI = this.statusRecording;
        this.error_text = json.error;
      }
    });
  }

}
