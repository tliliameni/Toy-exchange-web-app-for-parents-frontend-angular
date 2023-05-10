import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import { switchMap, from, tap, delay, map } from 'rxjs';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
 // @ViewChild("multiselect") public multiselect: MultiSelectComponent;

  public data: Array<{ text: string; value: number }> = [];

  selectedCategory = '';

  categoriesList = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) {}

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
  showAllCategories(): void {
    this.selectedCategory = '';
    this.searchArticle();
    this.getArticles();
  }

  searchArticleByCategory(categoryName: string): void {
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




}
