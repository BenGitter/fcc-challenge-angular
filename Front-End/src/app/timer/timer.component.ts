import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  providers: [ TimerService ]
})

export class TimerComponent implements OnInit {
  loggedIn:boolean = false;

  constructor(private timerService:TimerService) { }

  ngOnInit() {
    this.getStatus();
    console.log("Hi!");
    this.login();
  }

  getStatus(){
    this.timerService.getStatus().subscribe(msg => {
      // this.loggedIn = msg.loggedIn;
      console.log(msg);
    });
  }

  login(){
    // this.timerService.login().subscribe(msg => {
    //   console.log(msg);
    // });

    window.open("http://localhost:30000/api/login");
  }



}
