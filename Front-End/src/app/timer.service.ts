import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class TimerService {
  user:any = {};
  isLoggedIn:boolean = false;
  isRunning:boolean = false;
  currentMinutes:number = 0;

  constructor(private router:Router, private http:Http) {
    window.addEventListener("message", this.receiveMessage.bind(this));
  }

  changeStatus(){
    this.isRunning = !this.isRunning;
  }

  getStats(){
    return this.http.get("http://localhost:8080/api/stats/" + this.user.userId)
      .map(res => res.json());
  }

  login(){
    var wnd = window.open("http://localhost:8080/api/login");
  }

  receiveMessage(event){
    if(event.origin !== "http://localhost:8080"){
      console.log(event.origin);
      return false;
    }

    this.user = event.data;
    this.isRunning = this.user.isRunning;
    
    if(this.user.hasOwnProperty("userId")){
      this.isLoggedIn = true;
      this.router.navigate(["/timer"]);
      console.log(this.user);
    }
  }
}
