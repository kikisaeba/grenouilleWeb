import { Component, OnInit } from '@angular/core';
import {TokensService} from '../tokens.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {APIResult, APIResultStatsCSVGet} from '../APIResults/APIResults';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import CsvHelper from '../shared/csv/csv_helpers';

@Component({
  selector: 'app-stats-csv',
  templateUrl: './stats-csv.component.html',
  styleUrls: ['./stats-csv.component.css']
})
export class StatsCsvComponent implements OnInit {

  selectedTabIndex = 0;
  csvSave: string = undefined;
  csvContent: string[] = ['', '', ''];
  csvKeys: string[] = ['preti8_teams', 'preti8_players', 'ti8_groups'];
  dataTrees: Object[][] = [[], [], []];
  error_text = '';
  imageCacheBusting = '';
  selectedTeam = '39';
  selectedPlayer = '86745912';
  generatingImage = false;

  baseUrl = '';

  constructor(
    private tokenService: TokensService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  ngOnInit() {
    this.refreshUI();
  }

  resetUI() {
    this.csvSave = undefined;
    this.csvContent = ['', '', ''];
    this.dataTrees = [[], [], []];
    this.imageCacheBusting = Math.floor((Math.random() * 1000)).toString();
  }

  refreshUI() {
    this.resetUI();

    for (let i in this.csvKeys) {
      let options = {
        params: {data: JSON.stringify({'key': this.csvKeys[i]})}
      };
      this.http.get<APIResult>(environment.baseUrl + '/api/stats/csv/get', options).subscribe(json => {
        if (json.success === 'yes') {
          this.error_text = undefined;
          let payload = (<APIResultStatsCSVGet> json.payload);
          this.csvContent[i] = payload.csv;
          this.buildDataTree(i);
        } else {
          this.error_text = json.error;
        }
      });
    }
  }

  buildDataTree(i) {
    this.dataTrees[i] = CsvHelper.CSVtoArray(this.csvContent[i]);
  }

  tabChanged(event) {
    if (this.csvSave !== undefined) {
      this.csvContent[this.selectedTabIndex] = this.csvSave;
      this.csvSave = undefined;
    }
    this.selectedTabIndex = event;
  }

  teamChanged(event) {
    for (const index in this.dataTrees[1]) {
      if (index === '0' || this.dataTrees[1][index][3] !== event) {
        continue;
      }

      this.selectedPlayer = this.dataTrees[1][index][1];
      break;
    }
  }

  editCSV() {
    this.csvSave = this.csvContent[this.selectedTabIndex];
  }

  validateEdit() {
    const payload = {'key': this.csvKeys[this.selectedTabIndex], 'value': this.csvContent[this.selectedTabIndex]};
    this.http.post<APIResult>(environment.baseUrl + '/api/stats/csv/update', payload , this.tokenService.getAuthTokenHeader())
      .subscribe(json => {
        if (json.success === 'yes') {
          this.error_text = undefined;
          this.csvSave = undefined;
          this.buildDataTree(this.selectedTabIndex);
        } else {
          this.error_text = json.error;
        }
      });
  }

  cancelEdit() {
    this.csvContent[this.selectedTabIndex] = this.csvSave;
    this.csvSave = undefined;
  }

  generateImages() {
    this.generatingImage = true;
    const payload = {'key': this.csvKeys[this.selectedTabIndex], 'payload': {'team_id': null, 'player_id': null}};
    this.http.post<APIResult>(environment.baseUrl + '/api/stats/csv/img/generate', payload).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        this.generatingImage = false;
        this.refreshUI();
      } else {
        this.error_text = json.error;
      }
    });
  }

  generateCurrentImage() {
    this.generatingImage = true;
    const payload = {'key': this.csvKeys[this.selectedTabIndex], 'payload': {}};
    if (this.selectedTeam !== undefined) {
      payload['payload']['team_id'] = this.selectedTeam;
    }

    if (this.selectedPlayer !== undefined && this.selectedPlayer !== '') {
      payload['payload']['player_id'] = this.selectedPlayer;
    }

    this.http.post<APIResult>(environment.baseUrl + '/api/stats/csv/img/generate', payload).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        this.generatingImage = false;
        this.refreshUI();
      } else {
        this.error_text = json.error;
      }
    });
  }
}
