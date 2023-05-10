import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { News } from '../Models/news';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  newsId: number;
  news: News;
  editForm: FormGroup;
  title: String;
  imageURL: string;
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
    private newsService: NewsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    })

    this.newsId = +this.route.snapshot.paramMap.get('id');

    this.newsService.getNewsById(this.newsId).subscribe(data => {
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
    this.newsService.updateNews(this.newsId, this.editForm.get('photo').value, this.editForm.get('title').value, this.editForm.get('description').value).subscribe(() => {
      console.log('News item updated successfully!');
      this.snackBar.open('News item updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
}
/*
  id: number;
  news: News;
  newsForm: FormGroup;
  title = '';
  description = '';
 file: File;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private newsService: NewsService,  private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  this.updateForm();

  }
  updateForm() {
  this.id = +this.route.snapshot.paramMap.get('id');
  this.newsService.getNewsById(this.id).subscribe(data => {
    this.news = data;
    this.newsForm = this.formBuilder.group({
      title: new FormControl(this.news.title),
      description: new FormControl(this.news.description),
      image: new FormControl(this.news.file)
    });
  });
}
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.newsForm.get('image')?.setValue(this.file);
  }

  onSubmit() {
    const formData = new FormData();
  formData.append('image',this.newsForm.get('image')?.value);
  formData.append('title', this.newsForm.get('title')?.value);
  formData.append('description', this.newsForm.get('description')?.value);
console.log(formData);
    this.newsService.updateNews(this.id,formData).subscribe(() => {
      console.log('News item updated successfully!');
      this.snackBar.open('News item updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
*/

