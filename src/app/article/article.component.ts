import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import { switchMap, from, tap, delay, map } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { PageArticle } from '../Models/PageArticle';

import { ArticlePageService } from '../services/article-page.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  title: String;
  imageURL: string;
 Contact:PageArticle;
  public data: Array<{ text: string; value: number }> = [];

  selectedCategory = '';

  categoriesList = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private newsService:ArticlePageService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  getPage(): void {
    this.newsService.getPageContactById(1)
      .subscribe(
        data => {
          this.Contact = data;
            this.newsService.getImage(this.Contact.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    this.Contact.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}

 /* ngAfterViewInit() {
    const contains = (value) => (s) =>
      s.text.toLowerCase().indexOf(value.toLowerCase()) !== -1;

    this.multiselect.filterChange
      .asObservable()
      .pipe(
        switchMap((value) =>
          from([this.data]).pipe(
            tap(() => (this.multiselect.loading = true)),
            delay(1000),
            map((data) => data.filter(contains(value)))
          )
        )
      )
      .subscribe((x) => {
        this.data = x;
        this.multiselect.loading = false;
      });

    this.categoryService.getAllCategories().subscribe((categories) => {
      this.data = categories.map((category) => {
        return { text: category.nom, value: category.id };
      });
    });
  }*/

  articlesList: any = [];

  searchQuery: string = '';
  p: number = 1;


  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe(
      data => {
        this.categoriesList = data;
      },
      error => console.log(error)
    );
    this.getArticles();
    this.getPage();
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe(
        data => {
          this.articlesList = data;
          for (let article of this.articlesList) {
            this.profileService.getImage( article.user.id).subscribe(
              data=>{
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                  article.user.imagedataUrl = reader.result as string;
                };
                console.log(article.user.imagedataUrl);
              },
            error => console.log(error)
          );
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
  showAllCategories(): void {
    this.selectedCategory = '';
    this.searchArticle();
    this.getArticles();
  }

  viewmore(id: number) {
    this.router.navigate(['/articledetails', id]);
  }
  searchArticleByCategory(categoryName: string): void {
    if (categoryName === '') {
      this.resetFilter();
      return;
    }

    this.articleService.searchByCategoryName(categoryName)
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


 /* searchArticle(): void {
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
  }*/
  searchArticle(): void {
    if (this.searchQuery === '') {
      this.resetFilter();
      return;
    }

    if (this.selectedCategory) {
      this.searchArticleByCategory(this.selectedCategory);
    } else {
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
  resetFilter(): void {
    this.searchQuery = '';
    // Reset any other filter-related variables or properties if needed
    // Perform any other actions required to reset the filter

    // Example: Clear the newsList
    this.articlesList = this.getArticles();
  }




}
