import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HomeComponent } from './home/home.component';
import { WeatherServiceService } from './weather-service.service';
import { WeatherComponent } from './weather/weather.component';
import { ChartModule } from 'angular-highcharts';
import { AuthGuardService } from './auth-guard-service.service';
import { Ng2CompleterModule } from "ng2-completer";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'weather', component: WeatherComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'home'}
]; 

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, HttpClientModule, RouterModule.forRoot(routes), ChartModule, Ng2CompleterModule],
  declarations: [ AppComponent, HelloComponent, HomeComponent, WeatherComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WeatherServiceService, AppComponent, AuthGuardService]
})
export class AppModule { }
