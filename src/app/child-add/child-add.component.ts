import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-child-add',
  templateUrl: './child-add.component.html',
  styleUrls: ['./child-add.component.css']
})
export class ChildAddComponent {
  isFormSubmitted = false;
  myform = new FormGroup({
    age: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
  });
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Submit the form data
      this.isFormSubmitted = true;
    }
  }
}
