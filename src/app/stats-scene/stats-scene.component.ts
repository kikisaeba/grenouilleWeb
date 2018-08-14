import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {APIResult, APIResultStatsSceneGet} from "../APIResults/APIResults";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-stats-scene',
  templateUrl: './stats-scene.component.html',
  styleUrls: ['./stats-scene.component.css']
})
export class StatsSceneComponent implements OnInit {

  sceneImg: string;
  continue_scene: boolean;

  refreshInterval: number;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.continue_scene = true;
    this.sceneImg = environment.baseUrl + '/api/stats/img/empty';
    this.refreshInterval = setInterval(() => { this.refreshImg() }, 1000 * 2);
    this.refreshImg();
  }

  refreshImg() {
    if (!this.continue_scene) {
      clearInterval(this.refreshInterval);
      return;
    }

    this.http.get<APIResult>(environment.baseUrl + '/api/stats/scene/get').subscribe(json => {
      if (json.success === 'yes') {
        let payload = (<APIResultStatsSceneGet> json.payload);
        this.sceneImg = environment.baseUrl + '/api/stats/img/' + payload.img + '?m=' + payload.last_modified;
        this.continue_scene = payload.continue;
      } else {
      }
    });
  }


}
