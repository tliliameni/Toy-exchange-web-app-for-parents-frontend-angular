import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Models/article';
import { ArticleService } from '../services/article.service';
import { data } from 'jquery';
import { ProfileService } from '../services/profile.service';
import { StorageService } from '../services/storage.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: Article;
  id: number;
  phone:string;
  user: User;
  constructor(private route: ActivatedRoute,private profileService:ProfileService,private storageService:StorageService, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getArticleById(this.id);
    this.getImageById(this.id);



  }



getImageById(id:number){
  this.articleService.getImage(id).subscribe(
    data=>{
      this.article.image=data;
    }
    ,
      error => {
        console.log(error);
      }
  )
}
  getArticleById(id: number): void {
    this.articleService.getArticleById(id).subscribe(
      data => {
        this.article = data;
       this.profileService.getPhone( this.article.user.id).subscribe(data=>this.phone=data);
       this.profileService.getImage( this.article.user.id).subscribe(
        data=>{
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onload = () => {
            this.article.user.imagedataUrl = reader.result as string;
          };
          console.log(this.article.user.imagedataUrl);
        },
      error => console.log(error)
    );

        this.articleService.getImage(this.article.id)
        .subscribe(
          image => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
              this.article.imagedataUrl = reader.result as string;
            };
          },
          error => console.log(error)
        );
        console.log(data)
        console.log(data.image)
      },
      error => {
        console.log(error);
      }
    );
  }

}
