import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TotalResultsComponent } from '../total-results/total-results.component';
import { TotalResultsService } from './total-results-service.service';
import { AboutComponent } from './about/about.component';
import { TeamDataComponent } from './team-data/team-data.component';

@NgModule({
  declarations: [
    AppComponent,
    TotalResultsComponent,
    AboutComponent,
    TeamDataComponent
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
