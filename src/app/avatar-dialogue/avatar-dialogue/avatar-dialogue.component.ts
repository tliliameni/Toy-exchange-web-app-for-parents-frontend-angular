
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-dialog',
  template: `
    <h2 mat-dialog-title>Selected Avatar</h2>
    <div mat-dialog-content>
      <img src="{{ data.avatar.url }}" [alt]="data.avatar.name" />
    </div>
    <div mat-dialog-actions>
      <button mat-button ((close))="true">OK</button>
    </div>
  `,
})
export class AvatarDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
