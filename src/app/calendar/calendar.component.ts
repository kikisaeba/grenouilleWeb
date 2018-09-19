import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { APIResult } from "../APIResults/APIResults";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-stats-scene',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currentWeek: string;
  nextWeek: string;
  error_text: string = undefined;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.currentWeek = environment.baseUrl + '/api/stats/img/calendar_now';
    this.nextWeek = environment.baseUrl + '/api/stats/img/calendar_next';
    this.error_text = undefined;

    this.imageGenerationUpdate();
  }

  rebuildCalendar() {
    this.error_text = undefined;
    this.http.post<APIResult>(environment.baseUrl + '/api/calendar/generate', {}).subscribe(json => {
      if (json.success === 'yes') {
        this.imageGenerationUpdate();
      } else {
        this.error_text = json['error']
      }
      console.log(json)
    });
  }

  imageGenerationUpdate() {
    let cache_busting = '?m=' + Math.floor((Math.random()*100000)).toString();
    this.currentWeek = environment.baseUrl + '/api/stats/img/calendar_now' + cache_busting;
    this.nextWeek = environment.baseUrl + '/api/stats/img/calendar_next' + cache_busting;
  }

}
