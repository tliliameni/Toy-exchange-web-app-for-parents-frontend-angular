import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  showPassword = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hide = true;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password, username } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
        this.router.navigate(['/login']);
        }, 2000)
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
