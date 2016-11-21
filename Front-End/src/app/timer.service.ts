import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TimerService {

  constructor(private _http:Http) { }

  getStatus(){
    return this._http.get("http://localhost:30000/api")
      .map(res => res.json());
  }

  login(){
    return this._http.get("http://localhost:30000/api/login");
  }
}
