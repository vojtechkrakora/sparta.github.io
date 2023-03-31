import { Component, OnInit } from '@angular/core';
import {TotalResultsService} from "../total-results-service.service";

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css']
})
export class TeamResultsComponent implements OnInit {
  data: any[] | undefined;
  lastRefreshed: Date;

  constructor(protected service: TotalResultsService) {
    this.lastRefreshed = new Date();
  }

  ngOnInit(): void {
    this.refreshData()
    this.lastRefreshed = new Date();

    setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    this.service.getData().subscribe(data => {
      // this.data = data.sort((a, b) => { return this.comparePlayers(a, b);});
    });
    this.lastRefreshed = new Date();
  }
}
