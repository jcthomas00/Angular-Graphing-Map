import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const POLLUTION_BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution/history',
POLLUTION_APP = '378e31da58c3d45665f8d069e85e1e88';

@Injectable({
  providedIn: 'root'
})

export class PollutionService {

  constructor(private http:HttpClient) { }
  getPollution = (
    lat:number=29, lon:number=95,
    start:number=1606802400, 
    end:number=new Date('12/1/2021').getTime() 
  ):Observable<any> => {
    const url = `${POLLUTION_BASE_URL}?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${POLLUTION_APP}`
    console.log(url)
    return this.http.get(url);
  }
}
