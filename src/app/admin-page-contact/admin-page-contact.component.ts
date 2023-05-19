import { Component, OnInit } from '@angular/core';
import { ContactUsService } from '../services/contact-us.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PageContact } from '../Models/PageContact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page-contact',
  templateUrl: './admin-page-contact.component.html',
  styleUrls: ['./admin-page-contact.component.css']
})
export class AdminPageContactComponent implements OnInit {
  newsId: number;
  editForm: FormGroup;
  title: String;
  imageURL: string;
 Contact:PageContact;

  searchQuery: string = '';
  p: number = 1;

  constructor(private newsService: ContactUsService,public dialog: MatDialog, private formBuilder: FormBuilder,
   private snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.getNews();
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      photo: ['', Validators.required]
    })

    this.newsId =1;

    this.newsService.getPageContactById(1).subscribe(data => {
      console.log(data)
      console.log(data.photo)
      this.Contact = data;
      this.editForm.patchValue(this.Contact);
    });




  }
  viewmore() {
    this.router.navigate(['/contact']);
  }
  getNews(): void {
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
                    this.Contact.imageDataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}

  editNews() {

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
    this.newsService.updatePageContact(1, this.editForm.get('photo').value, this.editForm.get('title').value, this.editForm.get('description').value).subscribe(() => {
      console.log('Page Contact updated successfully!');
      this.snackBar.open('Page Contact item updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
}


