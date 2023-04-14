import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewsService } from '../services/news.service';


@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  newsForm: FormGroup;
  title = '';
  description = '';
  file: File | null = null;
  imageData: any; // assuming imageData is defined and has a value

  constructor(private newsService: NewsService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
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
    newsData.append('title', this.newsForm.get('title')?.value);
    newsData.append('description', this.newsForm.get('description')?.value);

    this.newsService.createNews(newsData).subscribe(
      response => {
        console.log(response);

        // Show success message using ngx-toastr
        this.snackBar.open('News created!', 'Dismiss', { duration: 3000 });


        this.newsForm.reset();


        this.imageData = null;
      },
      error => {
        console.log(error);
        // Show error message using ngx-toastr
        this.snackBar.open('Failed to create news.', 'Dismiss', { duration: 3000 });
      }
    );
  }

  get sanitizedImageData(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.imageData);
  }
}
