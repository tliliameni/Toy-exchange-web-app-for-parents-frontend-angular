import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { StorageService } from '../services/storage.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent  implements OnInit {
  id: number;
  user: User;
  user1:User;
 // editForm: FormGroup;

  phone:string;
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.editForm.patchValue({
      photo: file
    });
    this.editForm.get('photo').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.user.imagedataUrl = reader.result as string;
      this.editForm.get('photo').setValue(this.user.imagedataUrl); // Update photo form control with the image URL
    }
    reader.readAsDataURL(file);
  }


  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,private storageService:StorageService, private snackBar: MatSnackBar) { }
    editForm: FormGroup= this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone:[''],
      photo: ['']
    })
  ngOnInit(): void {

    this.id = +this.route.snapshot.paramMap.get('id');
    this.user = this.storageService.getUser();

    this.profileService.getUser(this.user.id).subscribe(data => {
      this.user = data;
      this.editForm.patchValue(this.user);
    });
   this.profileService.getPhone(this.user.id).subscribe(data => {
    this.phone = data;
    this.user.phoneNumber = this.phone;
    console.log("Phone: " + this.phone);
    this.editForm.get('phone').setValue(this.phone);

  });
    //this.user.phoneNumber=this.phone;

   // console.log("hhhhh"+this.user.phoneNumber);
    //this.editForm.patchValue(this.user);

  }

  onFileSelect(event): void {
    if (event.target.files.length > 0) {
      const photo = event.target.files[0];
      this.editForm.get('photo').setValue(photo);
    }

  }

  onSubmit(): void {

    this.profileService.updateUser(this.id, this.editForm.get('photo').value, this.editForm.get('username').value, this.editForm.get('email').value, this.editForm.get('phone').value).subscribe(() => {
      console.log('Profile updated successfully!');
      this.snackBar.open('Profile updated successfully!', 'Dismiss', { duration: 3000 });
    });
  }
}


