import { Component, OnInit } from '@angular/core';
import { DashboardService, NewUserCount } from '../services/dashboard.service';
import { ChartConfiguration, Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  counter:number;
   newUserCounts: NewUserCount[];
   usercount: number;
   usernames: string[];
   users: import("c:/Users/dell/projectPFE/src/app/Models/User").User[];
   newsCount: number;

   getNewUsersByDays(days: number = 7) {
     this.dashboardService.getNewUsersByDays(days)
       .subscribe(newUserCounts =>{
          this.newUserCounts = newUserCounts;
          for (let num of this.newUserCounts) {
           this.counter=+num.count;
          }
       });

   }

   articleCount: number;


   constructor(private articleServise: ArticleService,  private snackBar: MatSnackBar,public dialog: MatDialog,private http: HttpClient,private dashboardService: DashboardService) {}
   getArticlesCount() {
     this.http.get<number>('http://localhost:8090/Articles/articles-count')
       .subscribe(count => {
         this.articleCount = count;
       });
   }
   getNewssCount() {
     this.http.get<number>('http://localhost:8090/News/news-count')
       .subscribe(count => {
         this.newsCount = count;
       });
   }
   getUsersCount() {
     this.http.get<number>('http://localhost:8090/dashboard/user-count')
       .subscribe(count => {
         this.usercount = count;
       });}

   ngOnInit() {
     this.getArticlesCount();
     this.getNewUsersByDays();
     this.getUsersCount();

 this.getNewssCount();


   }
    /* this.getUserCount();
     this.getNewUsersByDays(7);*/


 }
