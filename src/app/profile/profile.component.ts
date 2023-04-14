import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-profile',
  template: `
    <div class="profile">
      <div class="avatar-container">
        <img [src]="avatarUrl" alt="Avatar" (click)="chooseAvatar()">
      </div>
      <div class="details">
        <h2>{{name}}</h2>
        <p>{{email}}</p>
        <!-- Other profile details here -->
      </div>
    </div>
  `,
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
      overflow: hidden;
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
  avatarUrl = '../../../assets/images/avatar4.jpg';
  name = 'Ameni Tlili';
  email = 'amenitlili@gmail.com';

  constructor(public dialog: MatDialog) {}

  chooseAvatar() {
    const dialogRef = this.dialog.open(AvatarDialog, {
      width: '400px',
      data: { avatarUrl: this.avatarUrl }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.avatarUrl = result;
      }
    });
  }
}

@Component({
  selector: 'avatar-dialog',
  template: `
    <h2 mat-dialog-title>Choose an Avatar</h2>
    <div mat-dialog-content class="avatar-options">
      <div *ngFor="let option of avatarOptions" (click)="selectAvatar(option)">
        <img [src]="option" alt="Avatar Option">
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button >Cancel</button>
    </div>
  `,
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
export class AvatarDialog {
  avatarOptions = [
    '../../../assets/images/avatar2.jpg',
    '../../../assets/images/avatar3.jpg',
    '../../../assets/images/avatar4.jpg',

  ];

  constructor(public dialogRef: MatDialogRef<AvatarDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { avatarUrl: string }) {}

  selectAvatar(option: string) {
    this.dialogRef.close(option);
  }
}
