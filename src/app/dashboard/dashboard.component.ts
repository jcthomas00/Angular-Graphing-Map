import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { PollutionService } from '../pollution.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //variables to send to child components
  public aq:number[] = [];
  public rain:number[] = [];

  constructor(private weatherService:WeatherService, private pollutionService:PollutionService) { }

  ngOnInit(): void {
    this.upDateWeather(29.67, -95.25);
    this.updateAqi(29.67, -95.25)
  }

  //a new location was clicked
  handleLocationChange = (newLocation:[number, number]):void  => {
    console.log(newLocation);
    this.upDateWeather(newLocation[0], newLocation[1]);
    this.updateAqi(newLocation[0], newLocation[1])
  }

  //get new weather data from service and update the variable for child component
  upDateWeather = (lat:number, lon:number):void => {
    this.weatherService.getWeather(lat, lon).subscribe(
      (res) => {
        if(res.data.ClimateAverages){
          const avgWeather = res.data.ClimateAverages[0].month;
          const rains:number[] = [];
          avgWeather.forEach((month:any) => {
            rains.push(month.avgDailyRainfall)
          });
          this.rain = rains;
        }
      }, (err) => {
        console.log(err)
      }
    );
  }

  //get new pollution data from service and update the variable for child component
  updateAqi = (lat:number, lon:number):void => {

    //setting start and end date to pull historical data
    // const start = new Date('12/1/2020'),
    //       end = new Date('12/1/2021');

    this.pollutionService.getPollution(lat, lon).subscribe(
      (res) => {
        //response contains hourly pollution data so get monthly average
        const monthlyMeasurements:number = Math.floor(res.list.length/12);
        let offset:number = 0;
        this.aq = [];
        for (let i = 1; i < 13; i++) {  
          let monthlySum:number = 0;
          for (let j = 0 + offset; j < monthlyMeasurements*i; j++) {
            monthlySum += res.list[j].main.aqi;
          } 
          offset += monthlyMeasurements;
          this.aq.push(monthlySum/monthlyMeasurements);
        }
      }, (err) => {
        console.log(err)
      }
    )
  }



}
