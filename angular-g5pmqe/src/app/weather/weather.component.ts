import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  unit_text = 'show in deg C';
  chart:any;
  chartData:any = {};
  cityChosen:any;
  humidity:any;
  windSpeed:any;
  summary:any;
  constructor(private weatherService:WeatherServiceService) { }

  ngOnInit() {
    this.getForecastDetails();
  }

  unitConversion() {
    if(this.unit_text.endsWith('C')) {
      this.unit_text = 'show in deg F';
      this.chartData.unit ='deg C';
      for (let i = 0; i <  this.chartData.tMin.length; i++) {
        this.chartData.tMin[i] = (this.chartData.tMin[i] - 32)*5/9 ;
        this.chartData.tMax[i] = (this.chartData.tMax[i] - 32)*5/9 ;
      }
      this.createChart(this.chartData);
    } else {
      this.unit_text = 'show in deg C';
      this.chartData.unit = 'deg F'
      for (let i = 0; i <  this.chartData.tMin.length; i++) {
        this.chartData.tMin[i] = (this.chartData.tMin[i] * (5/9)) + 32 ;
        this.chartData.tMax[i] = (this.chartData.tMax[i] * (5/9)) + 32 ;
      }
      this.createChart(this.chartData);
    }
  }
   getForecastDetails() {
     const lat = localStorage.getItem('latitude');
     const long = localStorage.getItem('longditude');
     const tMin = [];
     const tMax = [];
     const category = [];
   this.weatherService.getForecast(lat, long).subscribe(response => {
     this.cityChosen = response.timezone;
     this.humidity = response.currently.humidity;
     this.windSpeed = response.currently.windSpeed;
     this.summary = response.daily.summary;
     response.daily.data.forEach((item, index) => {
       tMin.push(item.temperatureMin);
       tMax.push(item.temperatureMax);
       const date_today = new Date();
     const newDate = new Date(date_today.setDate(date_today.getDate()+index));
     category.push(newDate.toDateString().split(' ')[0]);
     });
     this.chartData = {
       tMin: tMin,
       tMax: tMax,
       cat:  category,
       unit: 'deg F'
     }
     this.createChart(this.chartData);
     localStorage.setItem('latitude', '');
     localStorage.setItem('longditude', '');
   });

   }
   createChart(chartData) {
      this.chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Temperature Range chart'
    },
    subtitle: {
      text: '(click on the legends to hid/show the series)'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: chartData.cat
    },
    yAxis: {
      title:{ text: 'Temperature '+chartData.unit}
    },
    tooltip: {
       formatter: function () {
            return this.series.name + ' for ' + this.x+' is '               + this.y.toFixed(2) + ' '+ chartData.unit;
        }
    },
    series: [
      {
        name: 'Temperature Min',
        data: chartData.tMin
      },
      {
        name: 'Temperature Max',
        data: chartData.tMax
      }
    ]
  });
   }
}