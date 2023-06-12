import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmailService } from '../services/email.service';
import { AboutUsService } from '../about-us.service';
import { AboutUs } from '../Models/AboutUs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  title: String;
  imageURL: string;
  aboutus:AboutUs;


  form: FormGroup;

 constructor(private newsService:AboutUsService,public dialog: MatDialog,
  private snackBar: MatSnackBar,private router: Router,
  private emailService: EmailService
) {}


  ngOnInit(): void {
    this.getNews();



  }


  getNews(): void {
    this.newsService.getAboutUsById(1)
      .subscribe(
        data => {
          this.aboutus = data;
            this.newsService.getAboutUsImage(this.aboutus.id)
              .subscribe(
                image => {
                  const reader = new FileReader();
                  reader.readAsDataURL(image);
                  reader.onload = () => {
                    this.aboutus.imagedataUrl = reader.result as string;
                  };
                },
                error => console.log(error)
              );
          },)}



  }


