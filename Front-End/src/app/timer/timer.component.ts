import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent implements OnInit {
  loggedIn:boolean = false;
  stats:any[];

  constructor(private timerService:TimerService, private router:Router) { }

  ngOnInit() {
    // Return to start if not logged in
    if(!this.timerService.isLoggedIn){
      this.router.navigate(["/"]);
    }
    this.getStats();
  }

  changeStatus(){
    this.timerService.changeStatus();
  }

  getStats(){
    this.timerService.getStats()
      .subscribe(stats => {
        this.stats = stats;
        console.log(this.stats);
        this.getTotalTime();
      });
  }

  getTotalTime(){
    var totalMilli = 0;
    this.stats.forEach(function(stat, i){
      totalMilli += stat.endTime - stat.startTime;
    });

    console.log(totalMilli / 1000 / 60, "minutes");
  }



}
