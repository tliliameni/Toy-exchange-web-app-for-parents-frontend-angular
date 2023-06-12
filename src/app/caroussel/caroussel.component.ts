import { Component, OnInit } from '@angular/core';
import { map, filter, take, switchMap } from 'rxjs';
import { LazyLoadScriptService } from '../lazy-load-script-service.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.css']
})
export class CarouselComponent  implements OnInit {

  public data: Array<{ text: string; value: number }> = [];

  selectedCategory = '';

  articlesList = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

   this.getArticles();
 }
 viewmore(id: number) {
  this.router.navigate(['/articledetails', id]);
}
 getArticles(): void {
   this.articleService.getAllArticles()
     .subscribe(
       data => {
         this.articlesList = data;

this.articlesList=this.articlesList.reverse();
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

