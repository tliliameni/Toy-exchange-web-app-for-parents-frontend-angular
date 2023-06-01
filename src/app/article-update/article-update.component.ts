import { Component, OnInit } from '@angular/core';
import { Article } from '../Models/article';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {
  artId: number;
  news: Article;
  editForm: FormGroup;
  title: String;
  imageURL: string;
  categories: any[];
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({
      photo: file
    });
    this.editForm.get('photo').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  image: any;
  imageDataUrl: any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,private categoryService:CategoryService ,private snackBar: MatSnackBar) { }
    getCategories(): void {
      this.categoryService.getAllCategories().subscribe(
        data => {
          this.categories = data;



        },
        (error) => {
          console.log(error);
        }
      );}
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      exchange: ['', Validators.required],
      photo: ['', Validators.required],
      categoryId: ['', Validators.required]
    })
this.getCategories();
    this.artId = +this.route.snapshot.paramMap.get('id');

    this.articleService.getArticleById(this.artId).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.news = data;

      this.editForm.patchValue(this.news);
    });




    // this.newsService.getNewsById(this.newsId).subscribe(
    //   data => {
    //     this.news = data;
    //     this.editForm = this.formBuilder.group({
    //       title: [data.title, Validators.required],
    //       description: [data.description, Validators.required],
    //       image: [this.newsService.getImage(this.newsId)
    //         .subscribe(
    //           image => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(image);
    //             reader.onload = () => {
    //               data.imageDataUrl = reader.result as string;
    //             };
    //           },
    //           error => console.log(error)
    //         )]
    //     });
    //   },
    //   error => console.log(error)
    // );
  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.get('photo').setValue(file);
    }

  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.editForm.get('photo').value);
    formData.append('title', this.editForm.get('title').value);
    formData.append('description', this.editForm.get('description').value);
    this.articleService.updateArticle(this.artId, this.editForm.get('photo').value, this.editForm.get('title').value, this.editForm.get('description').value,this.editForm.get('exchange').value,
    this.editForm.get('price').value,this.editForm.get('categoryId').value).subscribe(() => {
      console.log('artcle updated successfully!');
      this.snackBar.open('Article updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
}
