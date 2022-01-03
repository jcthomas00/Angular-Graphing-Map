import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should return results for empty call', () => {
    service.getWeather().subscribe((response) => {
      expect(response.data["ClimateAverages"]).toBeTruthy();
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=f63a321451f34029829233245211612&q=29,95&fx=no&cc=no&mca=yes&format=json'
    })

    req.flush(
      {"data":{
        "request":[{"type":"LatLon","query":"Lat 29.00 and Lon 95.00"}],
        "ClimateAverages":[{"month":[{"index":"1","name":"January","avgMinTemp":"-12.7","avgMinTemp_F":"9.2","absMaxTemp":"6.564516","absMaxTemp_F":"43.8","avgDailyRainfall":"2.53"},{"index":"2","name":"February","avgMinTemp":"-10.4","avgMinTemp_F":"13.3","absMaxTemp":"6.9321427","absMaxTemp_F":"44.5","avgDailyRainfall":"4.43"},{"index":"3","name":"March","avgMinTemp":"-7.7","avgMinTemp_F":"18.1","absMaxTemp":"9.088064","absMaxTemp_F":"48.4","avgDailyRainfall":"6.81"},{"index":"4","name":"April","avgMinTemp":"-2.8","avgMinTemp_F":"26.9","absMaxTemp":"14.14","absMaxTemp_F":"57.5","avgDailyRainfall":"7.59"},{"index":"5","name":"May","avgMinTemp":"1.8","avgMinTemp_F":"35.2","absMaxTemp":"15.545161","absMaxTemp_F":"60.0","avgDailyRainfall":"6.97"},{"index":"6","name":"June","avgMinTemp":"6.0","avgMinTemp_F":"42.8","absMaxTemp":"19.826666","absMaxTemp_F":"67.7","avgDailyRainfall":"6.49"},{"index":"7","name":"July","avgMinTemp":"7.1","avgMinTemp_F":"44.7","absMaxTemp":"20.806452","absMaxTemp_F":"69.5","avgDailyRainfall":"9.78"},{"index":"8","name":"August","avgMinTemp":"6.3","avgMinTemp_F":"43.3","absMaxTemp":"21.341936","absMaxTemp_F":"70.4","avgDailyRainfall":"9.55"},{"index":"9","name":"September","avgMinTemp":"4.5","avgMinTemp_F":"40.2","absMaxTemp":"19.815","absMaxTemp_F":"67.7","avgDailyRainfall":"7.06"},{"index":"10","name":"October","avgMinTemp":"-0.4","avgMinTemp_F":"31.2","absMaxTemp":"15.095782","absMaxTemp_F":"59.2","avgDailyRainfall":"3.96"},{"index":"11","name":"November","avgMinTemp":"-6.2","avgMinTemp_F":"20.9","absMaxTemp":"11.16","absMaxTemp_F":"52.1","avgDailyRainfall":"2.56"},{"index":"12","name":"December","avgMinTemp":"-9.6","avgMinTemp_F":"14.8","absMaxTemp":"8.806452","absMaxTemp_F":"47.9","avgDailyRainfall":"2.13"
      }]}]}}
    );
  })
});
