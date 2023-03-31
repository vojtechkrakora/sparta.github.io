import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TotalResultsService } from './total-results-service.service';
import { AboutComponent } from './about/about.component';
import { TeamDataComponent } from './team-data/team-data.component';
import { TeamResultsComponent } from './team-results/team-results.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TeamDataComponent,
    TeamResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TotalResultsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
