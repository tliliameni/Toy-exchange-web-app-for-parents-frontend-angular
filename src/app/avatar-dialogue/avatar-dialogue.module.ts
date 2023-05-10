import { CommonModule } from '@angular/common';
import { AvatarDialogComponent, ProfileComponent } from '../profile/profile.component';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    AvatarDialogComponent
  ],


})
export class AvatarDialogModule { }
