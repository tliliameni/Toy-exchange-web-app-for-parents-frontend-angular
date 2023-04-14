import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {

  newsList: any = [];

  searchQuery: string = '';
  p: number = 1;

  constructor(private newsService: NewsService,public dialog: MatDialog,   private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.newsService.getAllNews()
      .subscribe(
        data => {
          this.newsList = data;
          for (let news of this.newsList) {
            this.newsService.getImage(news.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    news.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  searchNews(): void {
    this.newsService.getAllNewsByMc(this.searchQuery)
      .subscribe(
        data => {
          this.newsList = data;
          for (let news of this.newsList) {
            this.newsService.getImage(news.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    news.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  editNews(id: number) {
    this.router.navigate(['/admin/edit', id]);
  }

  openConfirmationDialog(newsId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteArticles method from the articlesService
        this.newsService.deleteNews(newsId).subscribe(() => {
          this.snackBar.open('Articles deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error) => {
          // Handle error
        });
      }
    });
  }

}
