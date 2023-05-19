import { Component, OnInit } from '@angular/core';
import { Category } from '../Models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {
  newsId: number;
  news: Category;
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
    private newsService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      nom: ['', Validators.required],

      photo: ['', Validators.required]
    })

    this.newsId = +this.route.snapshot.paramMap.get('id');

    this.newsService.getCategoryById(this.newsId).subscribe(data => {
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
    formData.append('nom', this.editForm.get('nom').value);

    this.newsService.updateCategory(this.newsId, this.editForm.get('photo').value, this.editForm.get('nom').value).subscribe(() => {
      console.log('News item updated successfully!');
      this.snackBar.open('News item updated successfully!', 'Dismiss', { duration: 1000 });
    });
  }
}
