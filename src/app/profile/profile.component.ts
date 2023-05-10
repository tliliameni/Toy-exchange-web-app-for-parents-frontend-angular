import { Component, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';


export class AvatarDialogModule { }
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
  styles: [`
    .profile {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left:20%;
    }
    .avatar-container {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .avatar-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `]
})
export class ProfileComponent {

  currentUser: any;
  avatarUrl ='../../assets/images/Group.png' ;
  avatarOptions = [
    '../../assets/images/avatar2.jpg',
    '../../../assets/images/avatar3.jpg',
    '../../../assets/images/avatar4.jpg',
  ];

  constructor(private storageService: StorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.avatarUrl = this.currentUser.avatarUrl;
  }

  setAvatar() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      width: '400px',
      data: { avatarUrl: this.avatarUrl }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.avatarUrl = result;
        this.currentUser.avatarUrl = result;
        this.storageService.saveUser(this.currentUser);
      }
    });
  }
  updateAvatar(avatar) {
    this.currentUser.avatarUrl = avatar.url;
  }
}
@NgModule({
  imports: [
    CommonModule
  ]
})
export class ProfileComponentModule { }

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatardialogue.html',

  styles: [`
    .avatar-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .avatar-options div {
      position: relative;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .avatar-options div img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `]
})
export class AvatarDialogComponent {
  avatarOptions: string[];

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { avatarOptions: string[] }
  ) {
    this.avatarOptions = data.avatarOptions;
  }

  selectAvatar(option: string) {
    this.dialogRef.close(option);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
