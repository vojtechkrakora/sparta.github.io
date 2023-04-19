import { Component, OnInit } from '@angular/core';
import {TotalResultsService} from "../total-results-service.service";

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css']
})
export class TeamResultsComponent implements OnInit {
  data: any[] = [];
  lastRefreshed: Date;
  mapEntries: any;

  constructor(protected service: TotalResultsService) {
    this.service.getData().subscribe(data => {
      this.data = data;
    });
    console.log(this.data);
    this.lastRefreshed = new Date();
    this.refreshData()
  }

  ngOnInit(): void {
    const progressBar = document.getElementById("progress-bar");
    const progressLabel = document.getElementById("progress-label");
    const loadingText = document.getElementById("loading-text");
    if (progressBar != null) {
      progressBar.style.visibility = "visible";
    }
    if (progressLabel != null) {
      progressLabel.style.visibility = "visible";
    }
    if (loadingText != null) {
      loadingText.style.display = "block";
    }


    this.service.getData().subscribe(data => {
      this.data = data;
    });

    setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    this.service.getData().subscribe(data => {
      this.data = data;
    });
    this.lastRefreshed = new Date();
    this.getDistinctTeams();
    const progressBar = document.getElementById("progress");
    if (this.data.length != 0 && progressBar != null) {
      console.log(this.data.length);
      progressBar.style.display = "none";
    }
  }

  getDistinctTeams() {
    const teamSet = new Set();
    this.data.forEach(obj => {
      teamSet.add(obj.team);
    });
    const teams = Array.from(teamSet);
    let teamResults = new Map();
    for (let i = 0; i < teams.length; i++) {
      let teamResult = 0;
      let teamLogo = "";
      for(let j = 0; j < this.data.length; j++) {
        if (teams[i] === this.data[j].team) {
          teamResult += this.data[j].result1 + this.data[j].result1;
          teamLogo = this.data[j].teamLogo;
        }
      }
      teamResults.set({"name": teams[i], "logo": teamLogo}, teamResult);
    }
    this.mapEntries = [...teamResults.entries()].sort((a, b) => b[1] - a[1]);
  }
}
