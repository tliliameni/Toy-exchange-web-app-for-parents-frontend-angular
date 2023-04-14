import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  newsForm: FormGroup;
  nom:String;


  constructor(private newsService: CategoryService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newsForm = this.formBuilder.group({
      nom: ['', Validators.required],

    });
  }

  onSubmit() {
    const newsData = new FormData();
    newsData.append('nom', this.newsForm.get('nom')?.value);

    this.newsService.createCategories(this.newsForm.get('nom')?.value).subscribe(
      response => {
        console.log(response);

        // Show success message using ngx-toastr
        this.snackBar.open('Category created!', 'Dismiss', { duration: 3000 });


        this.newsForm.reset();
      },
      error => {
        console.log(error);
        // Show error message using ngx-toastr
        this.snackBar.open('Failed to create Category.', 'Dismiss', { duration: 3000 });
      }
    );
  }


}
