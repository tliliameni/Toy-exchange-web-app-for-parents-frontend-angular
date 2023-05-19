import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NewsService } from '../services/news.service';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  articlesList: any = [];

  searchQuery: string = '';
  p: number = 1;

  constructor(
    private articlesService: ArticleService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer // Inject the DomSanitizer service
  ) { }

  ngOnInit(): void {
    this.getarticles();
  }

  getarticles(): void {
    this.articlesService.getAllArticles()
      .subscribe(
        data => {
          this.articlesList = data;
          for (let article of this.articlesList) {
            this.articlesService.getImage(article.id)
              .subscribe(
                image => {
                  // Use the DomSanitizer to load the image safely
                  const imageUrl = URL.createObjectURL(image);
                  article.imageDataUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }
  viewmore(id: number) {
    this.router.navigate(['/articledetails', id]);
  }
  searchArticles(): void {
    this.articlesService.getAllArticleByMc(this.searchQuery)
      .subscribe(
        data => {
          this.articlesList = data;
          for (let article of this.articlesList) {
            this.articlesService.getImage(article.id)
              .subscribe(
                image => {
                  // Use the DomSanitizer to load the image safely
                  const imageUrl = URL.createObjectURL(image);
                  article.imageDataUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  openConfirmationDialog(articleId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteArticles method from the articlesService
        this.articlesService.deleteArticles(articleId).subscribe(() => {
          this.snackBar.open('Articles deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error) => {
          // Handle error
        });
      }
    });
  }

}
