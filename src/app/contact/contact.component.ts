import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { EmailDetails } from '../Models/EmailDetails';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageContact } from '../Models/PageContact';
import { ContactUsService } from '../services/contact-us.service';
interface ApiResponse {
  result: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title: String;
  imageURL: string;
 Contact:PageContact;
 formData = {
  name: '',
  email: '',
  message: ''
};

  form: FormGroup;

 constructor(private newsService: ContactUsService,public dialog: MatDialog,
  private snackBar: MatSnackBar,private router: Router,
  private fb: FormBuilder,
  private emailService: EmailService
) {
  this.form = this.fb.group({
    recipient: ['', Validators.required],
    subject: ['', Validators.required],
    msgBody: ['', Validators.required],

  });
}


  ngOnInit(): void {
    this.getNews();



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



    onSubmit(): void {
      /*const formData = new FormData();
      formData.append('recipient', this.form.get('recipient')!.value);
      formData.append('subject', this.form.get('subject')!.value);
      formData.append('msgBody', this.form.get('msgBody')!.value);*/


      const emailDetails: EmailDetails = {
        recipient: this.form.get('recipient')!.value,
        subject: this.form.get('subject')!.value,
        msgBody: this.form.get('msgBody')!.value,

      };
      this.emailService.sendSimpleEmail(emailDetails).subscribe(
        (response: any) => {
          this.snackBar.open('Your email is sent to us successfully!', 'Dismiss', { duration: 1000 });
          console.log(response);

        },
        (error: any) => {
          if (error.error instanceof ErrorEvent) {

          } else {

            console.log(error.error);
          }
        }
      );


      // or use this.emailService.sendEmailWithAttachment(emailDetails) for sending email with attachment
    }
  }


