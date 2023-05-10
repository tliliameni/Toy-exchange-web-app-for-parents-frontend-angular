import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: Article | undefined;
  id: number | undefined;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getArticleById(this.id);
  }

  getArticleById(id: number): void {
    this.articleService.getArticleById(id).subscribe(
      data => {
        this.article = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
