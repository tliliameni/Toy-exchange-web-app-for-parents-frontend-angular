import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { HttpClient } from '@angular/common/http';
import { DashboardService, NewUserCount } from '../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
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
      getAllUsers() {
        this.dashboardService.getAllUsers().subscribe(users => {
          this.users = users;
        });
      }

  ngOnInit() {
    this.getArticlesCount();
    this.getNewUsersByDays();
    this.getUsersCount();
    this.getAllUsers();
this.getNewssCount();


  }
   /* this.getUserCount();
    this.getNewUsersByDays(7);*/

  openConfirmationDialog(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteArticles method from the articlesService
        this.dashboardService.deleteUser(userId).subscribe(() => {
          this.snackBar.open('User deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error) => {
          // Handle error
        });
      }
    });
  }
}
