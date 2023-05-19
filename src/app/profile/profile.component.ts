import { Component, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../Models/article';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../services/profile.service';
import { da } from 'date-fns/locale';
import { User } from '../Models/User';


export class AvatarDialogModule { }
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  searchQuery: string = '';
  p: number = 1;
  phone: string;

  currentUser: User;
  avatarUrl ='../../assets/images/Group.png' ;
  avatarOptions = [
    '../../assets/images/avatar2.jpg',
    '../../../assets/images/avatar3.jpg',
    '../../../assets/images/avatar4.jpg',
  ];
  viewmore(id: number) {
    this.router.navigate(['/articledetails', id]);
  }
  articles:Article[];
  constructor(private storageService: StorageService,private articleService:ArticleService,public dialog: MatDialog,
    private router: Router,private snackBar: MatSnackBar,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.articleService.getUserArticles(this.currentUser.id).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        for (let article of this.articles) {
          this.articleService.getImage(article.id)
            .subscribe(
              image => {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                  article.imagedataUrl = reader.result as string;
                };
              },
              error => console.log(error)
            );
        }
      },
      (error) => {
        console.error(error);
      }
    );
    this. getProfileImage();
    this.profileService.getPhone(this.currentUser.id).subscribe(data=>this.phone=data);
    this.profileService.getUser(this.currentUser.id).subscribe(us=>this.currentUser=us);
  }

  getProfileImage(){
    this.profileService.getImage(this.currentUser.id).subscribe(
      data=>{
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => {
          this.currentUser.imagedataUrl = reader.result as string;
        };
        console.log(this.currentUser.imagedataUrl);
      },
    error => console.log(error)
  );
  }
  searchArticle(): void {
    this.articleService.getAllArticleByMc(this.searchQuery)
      .subscribe(
        data => {
          this.articles = data;
          for (let article of this.articles) {
            this.articleService.getImage(article.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    article.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }
  editProfile(id: number){

      this.router.navigate(['/editProfile',id]);

  }
  editarticle(id: number) {
    this.router.navigate(['/editarticle', id]);
  }
  openConfirmationDialog(articleId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call the deleteArticles method from the articlesService
        this.articleService.deleteArticles(articleId).subscribe(() => {
          this.snackBar.open('Articles deleted!', 'Dismiss', { duration: 3000 });
          location.reload(); // Refresh the page
        }, (error) => {
          // Handle error
        });
      }
    });
  }
}
