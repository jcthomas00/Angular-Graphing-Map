import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const WEATHER_BASE_URL = `http://api.worldweatheronline.com/premium/v1/weather.ashx`,
WEATHER_APP = 'f63a321451f34029829233245211612';

@Injectable({
  providedIn: 'root'
})


export class WeatherService {

  constructor(private http:HttpClient) { }

  getWeather = (lat:number=29, lon:number=95):Observable<any> => {
    const url = `${WEATHER_BASE_URL}?key=${WEATHER_APP}&q=${lat},${lon}&fx=no&cc=no&mca=yes&format=json`
    return this.http.get(url);
  }
  
}
