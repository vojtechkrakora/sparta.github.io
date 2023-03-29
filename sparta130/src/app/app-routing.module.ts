import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {TotalResultsComponent} from "../total-results/total-results.component";
import {TeamDataComponent} from "./team-data/team-data.component";


const routes: Routes = [
  { path: '', component: TotalResultsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'results/:teamName', component: TeamDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
