import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class WeatherServiceService {

  constructor(private http: Http) { }
  const jsonLL = {
          "bangalore": {
            "latitude": 12.971599,
            "longditude": 77.594566
          },
          "kolkatta": {
            "latitude": 13.464700,
            "longditude": 80.112442
          },
          "delhi": {
            "latitude": 28.704060,
            "longditude": 77.102493
          },
          "chennai": {
            "latitude": 13.082680,
            "longditude": 80.270721
          }
        }
  
  getCities() {
    return Object.keys(this.jsonLL);
  }
  getLatLong(city:any) {
    // const url = "https://www.latlong.net/_spm4.php";

   return this.jsonLL[city];
  }
  

  getForecast(lat, long):Observable<any> {
    const url = "https://api.darksky.net/forecast/dd3e191547484d14a57648175572d88e/"+lat+","+long;
    return this.http.get(url).map( res => res.json());
  }

}