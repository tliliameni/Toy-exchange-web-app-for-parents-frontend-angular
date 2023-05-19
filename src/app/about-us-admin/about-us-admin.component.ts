import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutUsService } from '../services/about-us.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUs } from '../Models/AboutUs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-about-us-admin',
  templateUrl: './about-us-admin.component.html',
  styleUrls: ['./about-us-admin.component.css']
})
export class AboutUsAdminComponent implements OnInit{
  aboutUs: AboutUs;
  viewForm:FormGroup;
  editForm: FormGroup;
  image:File;
  constructor(
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private aboutUsService: AboutUsService,
    private formBuilder: FormBuilder,public dialog: MatDialog,   private snackBar: MatSnackBar,private router: Router
  ) { }
  ngOnInit(): void {
      this.aboutUsService.getById(1).subscribe(data=>{
        this.aboutUs = data;
        this.viewForm = this.formBuilder.group({
          title: [this.aboutUs.title, Validators.required],
          description: [this.aboutUs.description, Validators.required],
          image:this.aboutUsService.getImage(this.aboutUs.id) .subscribe(
            dataa => {
              const reader = new FileReader();
              reader.readAsDataURL(dataa);
              reader.onload = () => {
                this.aboutUs.imagedataUrl = reader.result as string;
              };

            },

            error => console.log(error)
          )
        });
      })
      this.aboutUsService.getById(1).subscribe((data) => {
        this.aboutUs = data;
        this.editForm = this.formBuilder.group({
          title: [this.aboutUs.title, Validators.required],
          description: [this.aboutUs.description, Validators.required],
          image: [null] // Remove the image initialization here
        });
        this.editForm.patchValue(this.aboutUs);
      });
  }
  viewPage() {
    this.router.navigate(['/aboutus']);
  }
  onImageChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files[0];
    }
  }

  edit() {
    // Scroll to the editFormSection using the id
    const editFormSection = this.elementRef.nativeElement.querySelector('#editFormSection');
    if (editFormSection) {
      editFormSection.scrollIntoView({ behavior: 'smooth' });
    }}
  editPage(id: number) {
      if (this.editForm.valid) {


        this.aboutUsService.updateNews(this.editForm.get('id').value,this.editForm.get('image').value,this.editForm.get('title').value,this.editForm.get('description').value).subscribe(
          () => {
            // Success message and redirection
            this.snackBar.open('About Us updated successfully', 'Close', {
              duration: 2000
            });
            this.router.navigate(['/aboutus', id]);
          },
          (error) => {
            // Error handling
            console.log(error);
            this.snackBar.open('Failed to update About Us', 'Close', {
              duration: 2000
            });
          }
        );
      }
    }
} /*implements OnInit {

  aboutUs: AboutUs;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private aboutUsService: AboutUsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.aboutUsService.getAboutUsById(id).subscribe(aboutUs => {
      this.aboutUs = aboutUs;
      this.editForm = this.formBuilder.group({
        title: [this.aboutUs.title, Validators.required],
        description: [this.aboutUs.description, Validators.required],
        image: [null]
      });
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.editForm.get('title').value);
    formData.append('description', this.editForm.get('description').value);
    if (this.editForm.get('image').value) {
      formData.append('image', this.editForm.get('image').value);
    }
    this.aboutUsService.updateAboutUs(this.aboutUs.id, formData).subscribe(response => {
      console.log(response.message);
      this.ngOnInit();
    });
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editForm.get('image').setValue(file);
    }
  }

}*/
