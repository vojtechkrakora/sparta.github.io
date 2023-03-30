import { Component, OnInit } from '@angular/core';
import { TotalResultsService } from '../total-results-service.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import {TotalResultsComponent} from "../../total-results/total-results.component";

@Component({
  selector: 'app-team-data',
  templateUrl: './team-data.component.html',
  styleUrls: ['./team-data.component.css']
})
export class TeamDataComponent extends TotalResultsComponent implements OnInit {

  data: any[] | undefined;
  showColumn: boolean = true;
  teamName: string | null;

  constructor(protected service: TotalResultsService, protected breakpointObserver: BreakpointObserver,
      private route: ActivatedRoute) {
    super(service, breakpointObserver)
    this.teamName = null
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
  }

  dataOfTeam(data: any[] | undefined, teamName:string | null) {
    if(data == undefined) {
      return []
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
