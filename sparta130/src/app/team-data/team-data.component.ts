import { Component, OnInit } from '@angular/core';
import { TotalResultsService } from '../total-results-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.css']
})
export class TeamDataComponent  implements OnInit {

  data: any[] | undefined;
  showColumn: boolean = true;
  teamName: string | null;
  lastRefreshed: Date;
  currentYear: number;

  constructor(protected service: TotalResultsService, protected breakpointObserver: BreakpointObserver,
      private route: ActivatedRoute) {
    this.teamName = null
    this.currentYear = new Date().getFullYear();
    this.lastRefreshed = new Date();
  }

  ngOnInit(): void {
    this.service.getData().subscribe(data => {
      this.data = data.sort((a, b) => { return this.comparePlayers(a, b);});
    });

    this.route.paramMap.subscribe(params => {
      this.teamName = params.get('teamName');
    });

    this.breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.showColumn = !result.matches;
    });

    setInterval(() => {
      this.refreshData();
    }, 5000);
  }

  refreshData() {
    this.service.getData().subscribe(data => {
      this.data = data.sort((a, b) => { return this.comparePlayers(a, b);});
    });
    this.lastRefreshed = new Date();
  }

  dataOfTeam(data: any[] | undefined, teamName:string | null) {
    if(data == undefined) {
      return []
    }
    if (teamName == undefined) {
      return data;
    }
    return data.filter(dat => dat.team == teamName)
  }

  // Total number is the most important. If players have it same higher result2 is the winner
  // if also this element is same, result3 have to be as low as possible
  comparePlayers(a : any, b: any) {
    if ((b.result1 + b.result2) == (a.result1 + a.result2)) {
      if (b.result2 == a.result2) {
        return a.result3 - b.result3
      }
      return b.result2 - a.result2
    }
    return (b.result1 + b.result2) - (a.result1 + a.result2)
  }

}
