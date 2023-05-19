import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header-test',
  templateUrl: './header-test.component.html',
  styleUrls: ['./header-test.component.css']
})
export class HeaderTestComponent  {
  [x: string]: any;
  isLoggedIn = false;
  username?: string;
  constructor(private authService: AuthService,private storageService: StorageService) { }

    ngOnInit() {
      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();

        this.username = user.username;
      }
    }
    logout(): void {
      this.authService.logout().subscribe({
        next: res => {
          console.log(res);
          this.storageService.clean();

          window.location.reload();
        },
        error: err => {
          console.log(err);
        }
      });
    }
    isShowing: boolean;
}
