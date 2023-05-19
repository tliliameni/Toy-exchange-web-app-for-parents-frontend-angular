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
  file: File | null = null;
  imageData: any;


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
      image: ['', Validators.required]
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.newsForm.get('image')?.setValue(this.file);
  }
  onSubmit() {
    const newsData = new FormData();
    newsData.append('image', this.newsForm.get('image')?.value);
    newsData.append('nom', this.newsForm.get('nom')?.value);

    this.newsService.createCategories(newsData).subscribe(
      response => {
        console.log(response);

        // Show success message using ngx-toastr
        this.snackBar.open('Category created!', 'Dismiss', { duration: 3000 });


        this.newsForm.reset();
        this.imageData = null;
      },
      error => {
        console.log(error);
        // Show error message using ngx-toastr
        this.snackBar.open('Failed to create Category.', 'Dismiss', { duration: 3000 });
      }
    );
  }
  get sanitizedImageData(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.imageData);
  }

}
