import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { EmailDetails } from '../Models/EmailDetails';
interface ApiResponse {
  result: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  formData = {
    name: '',
    email: '',
    message: ''
  };

    form: FormGroup;

    constructor(
      private fb: FormBuilder,
      private emailService: EmailService
    ) {
      this.form = this.fb.group({
        recipient: ['', Validators.required],
        subject: ['', Validators.required],
        msgBody: ['', Validators.required],

      });
    }

    onSubmit(): void {
      const formData = new FormData();
      formData.append('recipient', this.form.get('recipient')!.value);
      formData.append('subject', this.form.get('subject')!.value);
      formData.append('msgBody', this.form.get('msgBody')!.value);


      const emailDetails: EmailDetails = {
        recipient: this.form.get('recipient')!.value,
        subject: this.form.get('subject')!.value,
        msgBody: this.form.get('msgBody')!.value,

      };
      this.emailService.sendSimpleEmail(emailDetails).subscribe(
        (response: any) => {
          console.log(response)
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


