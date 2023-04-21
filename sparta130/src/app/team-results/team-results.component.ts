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
      progressBar.style.display = "none";
    }
  }

  getDistinctTeams() {
    const result = new Map();

    this.data.forEach(player => {
      const teamName = player.team;
      const resultSum = player.result1 + player.result2;
      const teamLogo = player.teamLogo;


      if (result.has(teamName)) {
        const totalSum = result.get(teamName).totalSum + resultSum;
        result.set(teamName, {"name": teamName, "logo": teamLogo, "totalSum": totalSum});
      } else {
        result.set(teamName, {"name": teamName, "logo": teamLogo, "totalSum": resultSum});
      }
    });

    this.mapEntries = [...result.entries()].sort((a, b) => b[1].totalSum - a[1].totalSum);
  }
}
