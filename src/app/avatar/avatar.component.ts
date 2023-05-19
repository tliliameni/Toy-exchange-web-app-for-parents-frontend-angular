import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar',
  template: `
    <div class="avatar-selector">
   <div *ngFor="let avatar of avatars" >
        <img src="{{ avatar.url }}" [alt]="avatar.name" />
        <button (click)="onSelectAvatar(avatar)"> select </button>
      </div>
    </div>
  `,
  styles: [`
    .avatar-selector {
      display: flex;
      flex-wrap: wrap;
    }

    .avatar-selector div {
      margin: 5px;
      cursor: pointer;
    }
  `]
})
export class AvatarComponent {
  constructor(private dialog: MatDialog) {}

  avatars = [
    { name: 'Avatar 1', url: '../../assets/images/avatar1.jpg' },
    { name: 'Avatar 2', url: '../../assets/images/avatar2.jpg'  },
    { name: 'Avatar 3', url:  '../../assets/images/avatar3.jpg'  },
    { name: 'Avatar 4', url:  '../../assets/images/avatar4.jpg'  },
    { name: 'Avatar 5', url:  '../../assets/images/avatar5.jpg'  },
  ];
  selectedAvatar:  { name: 'Avatar 1', url: '../../assets/images/avatar1.jpg' } ;
  onSelectAvatar(avatar: any) {
    this.selectedAvatar = avatar;
    console.log(this.selectedAvatar);

   
  }

}

