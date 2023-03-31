import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {TeamDataComponent} from "./team-data/team-data.component";
import {TeamResultsComponent} from "./team-results/team-results.component";


const routes: Routes = [
  { path: '', component: TeamDataComponent },
  { path: 'about', component: AboutComponent },
  { path: 'results', component: TeamResultsComponent },
  { path: 'results/:teamName', component: TeamDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
