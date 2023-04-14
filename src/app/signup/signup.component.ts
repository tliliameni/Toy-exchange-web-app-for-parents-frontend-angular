import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from './user-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    username!: string;
    password!: string;
    confirmpassword!: string;
    showPassword = false;
    constructor(private userService: UserService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
      const user: User = {
        username: this.username,
        password: this.password
      };
      this.userService.addUser(user);
      console.log('New user:', user);
      // TODO: Save user data to database or other storage
    }
      // TODO: Handle successful signup and navigate to another page





  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('',Validators.required)
  });

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
