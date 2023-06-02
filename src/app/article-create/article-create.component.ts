import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../Models/category';
import { CategoryService } from '../services/category.service';
import { error } from 'jquery';
import { StorageService } from '../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  pageTitle = 'Create your article';
  categories: any[];
 /* article: any = {};
  categories: any[];
  selectedFile: File | undefined;
  articleForm: FormGroup;
  categ:Category;
categoryId:number;
  constructor(private articleService: ArticleService,private categoryService: CategoryService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.articleForm =this.formBuilder.group({
      'image': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'exchange': new FormControl('', Validators.required),
      'price': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required)
    });
    this.getCategories();
  }

  createArticle(): void {
    const formData = new FormData();
    formData.append('image', this.selectedFile as File);
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('description', this.articleForm.get('description')?.value);
    formData.append('exchange', this.articleForm.get('exchange')?.value);
    formData.append('price', this.articleForm.get('price')?.value);
    const k= this.articleForm.get('category');
  this.categoryService.getByName(this.articleForm.get('category').value.nom).subscribe(
    data => {
      this.categ = data;},
      (error) => {
        console.log(error);
      })

    console.log('IDDDD'+this.categ);
    console.log(this.categ);
    this.articleService.createArticle(formData,this.categ.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/articles']);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;



      },
      (error) => {
        console.log(error);
      }
    );
  }*/

  articleForm: FormGroup;
  selectedFile: File;
  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;



      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private articleService: ArticleService,private categoryService: CategoryService, private router: Router,private storageService:StorageService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      exchange: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
   /* if (this.articleForm.invalid) {
      return console.log(error);
    }*/

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.articleForm.get('title').value);
    formData.append('description', this.articleForm.get('description').value);
    formData.append('exchange', this.articleForm.get('exchange').value);
    formData.append('price', this.articleForm.get('price').value);
     const categId=this.articleForm.get('categoryId').value;
   const userId= this.storageService.getUser().id;
 // Replace with the actual user ID
  console.log("userId"+this.storageService.getUser().id);
  console.log("categId"+this.articleForm.get('categoryId').value);

    this.articleService.createArticle(formData,categId,userId).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Article created!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/articles']);
        // Display success message to user
      },
      error => {
        console.log(error);
        // Display error message to user
      }
    );
  }
}


