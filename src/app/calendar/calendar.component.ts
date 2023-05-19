import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  currentDate: Date;

constructor() { }

ngOnInit(): void {
  this.currentDate = new Date();
}

}
