import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUs } from '../Models/AboutUs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AboutUsService } from '../about-us.service';

@Component({
  selector: 'app-about-us-admin',
  templateUrl: './about-us-admin.component.html',
  styleUrls: ['./about-us-admin.component.css']
})
export class AboutUsAdminComponent implements OnInit{
  newsId: number;
  editForm: FormGroup;
  title: String;
  imageURL: string;
 Contact:AboutUs;

  searchQuery: string = '';
  p: number = 1;

  constructor(private newsService: AboutUsService,public dialog: MatDialog, private formBuilder: FormBuilder,
   private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.getNews();
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    })


    this.newsService.getAboutUsById(1).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;
      this.editForm.patchValue(this.Contact);
    });




  }
  viewmore() {
    this.router.navigate(['/aboutus']);
  }
  getNews(): void {
    this.newsService.getAboutUsById(1)
      .subscribe(
        data => {
          this.Contact = data;
            this.newsService.  getAboutUsImage(this.Contact.id)
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
    this.newsService.updateAboutUs(1, this.editForm.get('title').value, this.editForm.get('description').value, this.editForm.get('photo').value,).subscribe(() => {
      console.log('Page updated successfully!');
      this.snackBar.open('Page updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
}


