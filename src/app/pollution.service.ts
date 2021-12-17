import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const POLLUTION_BASE_URL = 'http://api.openweathermap.org/data/2.5/air_pollution/history',
POLLUTION_APP = '378e31da58c3d45665f8d069e85e1e88';

@Injectable({
  providedIn: 'root'
})

export class PollutionService {

  constructor(private http:HttpClient) { }

  getPollution = (start:number, end:number, lat:number=29, lon:number=95):Observable<any> => {
    const url = `${POLLUTION_BASE_URL}?lat=${lat}&lon=${lat}&start=${start}&end=${end}&appid=${POLLUTION_APP}`
    return this.http.get(url);
  }
}
