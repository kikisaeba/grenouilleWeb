import { Component, OnInit } from '@angular/core';
import CsvHelper from '../shared/csv/csv_helpers'
import {environment} from "../../environments/environment";
import {
  APIResult,
  APIResultStatsCSVGet, APIResultStatsSceneGet,
  APIResultStatsSceneStatusGet,
  APIResultStatsSceneStatusUpdate, APIResultStatsSceneUpdate
} from "../APIResults/APIResults";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-stats-scene',
  templateUrl: './stats-scene-control.component.html',
  styleUrls: ['./stats-scene-control.component.css']
})
export class StatsSceneControlComponent implements OnInit {

  currentScene: string;
  currentPreview: string;
  statSceneStatus: boolean;
  imageKey: string;
  dataTeams: string[][];
  dataPlayers: string[][];
  selectedTeam: string;
  selectedPlayer: string;

  error_text: string = undefined;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.statSceneStatus = false;
    this.imageKey = 'ti8_groups';
    this.dataTeams = [];
    this.dataPlayers = [];
    this.selectedTeam = '39';
    this.selectedPlayer = '86745912';
    this.currentScene = environment.baseUrl + '/api/stats/img/scene';
    this.currentPreview = environment.baseUrl + '/api/stats/img/preview';

    this.refreshUI();
    this.imagePreviewUpdate();
  }

  refreshUI() {
    this.http.get<APIResult>(environment.baseUrl + '/api/stats/scene/status/get').subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultStatsSceneStatusGet> json.payload);
        this.statSceneStatus = payload.activated;
      } else {
        this.error_text = json.error;
      }
    });
    this.http.get<APIResult>(environment.baseUrl + '/api/stats/scene/get').subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultStatsSceneGet> json.payload);
        this.currentScene = environment.baseUrl + '/api/stats/img/' + payload.img + '?m=' + payload.last_modified;
      } else {
        this.error_text = json.error;
      }
    });
    this.http.get<APIResult>(environment.baseUrl + '/api/stats/csv/get',
      { params: {data: JSON.stringify({'key': 'preti8_teams'})} }).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultStatsCSVGet> json.payload);
        this.dataTeams = CsvHelper.CSVtoArray(payload.csv);
        this.dataTeams = this.dataTeams.slice(1, this.dataTeams.length-1);
      } else {
        this.error_text = json.error;
      }
    });
    this.http.get<APIResult>(environment.baseUrl + '/api/stats/csv/get',
      { params: {data: JSON.stringify({'key': 'preti8_players'})} }).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultStatsCSVGet> json.payload);
        this.dataPlayers = CsvHelper.CSVtoArray(payload.csv);
        this.dataPlayers = this.dataPlayers.slice(1, this.dataPlayers.length-1);
      } else {
        this.error_text = json.error;
      }
    });
  }

  changeSceneStatus(event) {
    let payload = {'activated': event.checked};
    this.http.post<APIResult>(environment.baseUrl + '/api/stats/scene/status/update', payload).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        payload = <APIResultStatsSceneStatusUpdate>json.payload;
        this.statSceneStatus = payload.activated;
      } else {
        this.error_text = json.error;
      }
    });
  }

  keyChanged(event) {
    this.imagePreviewUpdate();
  }

  teamChanged(event) {
    for (let index in this.dataPlayers) {
      if (this.dataPlayers[index][3] != event.value) continue;

      this.selectedPlayer = this.dataPlayers[index][1];
      break;
    }
    this.imagePreviewUpdate();
  }

  playerChanged(event) {
    this.imagePreviewUpdate();
  }

  rebuildPreview() {
    let payload = {'key': this.imageKey, 'team_id': this.selectedTeam, 'player_id': this.selectedPlayer };
    this.http.post<APIResult>(environment.baseUrl + '/api/stats/csv/img/generate', payload).subscribe(json => {
      if (json.success === 'yes') {
        this.imagePreviewUpdate();
      }
    });
  }

  sendPreviewToScene() {
    let payload = {'img': this.previewImageMaker()};
    this.http.post<APIResult>(environment.baseUrl + '/api/stats/scene/update', payload).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let payload = (<APIResultStatsSceneUpdate> json.payload);
        this.currentScene = environment.baseUrl + '/api/stats/img/' + payload.img + '?m=' + payload.last_modified;
      } else {
        this.error_text = json.error;
      }
    });
  }

  imagePreviewUpdate() {
    let cache_busting = '?m=' + Math.floor((Math.random()*1000)).toString();
    this.currentPreview = environment.baseUrl + '/api/stats/img/' + this.previewImageMaker() + cache_busting;
  }

  previewImageMaker() {
    if (this.imageKey == 'ti8_groups') {
      return 'ti8_groups';
    } else if (this.imageKey == 'preti8_teams') {
      return 'preti8_teams-' + this.selectedTeam;
    } else if (this.imageKey == 'preti8_players') {
      return 'preti8_players-' + this.selectedPlayer;
    }
  }

}
