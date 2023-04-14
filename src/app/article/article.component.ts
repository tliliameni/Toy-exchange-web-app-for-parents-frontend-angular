import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articlesList: any = [];

  searchQuery: string = '';
  p: number = 1;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe(
        data => {
          this.articlesList = data;
          for (let article of this.articlesList) {
            this.articleService.getImage(article.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    article.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

  searchArticle(): void {
    this.articleService.getAllArticleByMc(this.searchQuery)
      .subscribe(
        data => {
          this.articlesList = data;
          for (let article of this.articlesList) {
            this.articleService.getImage(article.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    article.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          }
        },
        error => console.log(error)
      );
  }

}
