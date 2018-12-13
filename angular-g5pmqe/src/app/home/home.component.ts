import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WeatherServiceService]
})
export class HomeComponent implements OnInit {

  constructor(private weatherService:WeatherServiceService, private router: Router) { }
  name:any;
  formError:any;
  showError:boolean = false;
  citiesList:any;
  ngOnInit() {
    this.citiesList = this.weatherService.getCities();
  }
  getWeather(){
    this.showError = false;
    var regex = /^[a-z A-Z]$/;
    if (this.name === undefined) {
      this.name = '';
      this.showError = true;
      this.formError = 'The city name is mandatory to proceed further'
    }else if (regex.test(this.name)) {
      this.name = '';
      this.showError = true;
      this.formError = 'The city name cannot contain special characters'
    } else {
    let formData = new FormData();
    formData.append('c1', this.name);
    formData.append('action','gpcm');
    formData.append('cp','');
    console.log(this.name);
    const objLL = this.weatherService.getLatLong(this.name.toLowerCase());
    if(objLL !== undefined){
      localStorage.setItem('latitude', objLL['latitude'] );
      localStorage.setItem('longditude', objLL['longditude']);
      this.router.navigateByUrl('/weather');
    } else {
      this.name = '';
      this.showError = true;
      this.formError = 'Sorry for the inconvenience ! Our database dont have the info for the city you have entered. Please query for some other city'
    }
    }
    
  }
}