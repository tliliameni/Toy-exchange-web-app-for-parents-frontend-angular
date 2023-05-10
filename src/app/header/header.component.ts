import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
  isShowing: boolean;

toggleSidenav() {
   this.isShowing = !this.isShowing;
}

callMethods() {
    this.toggleSidenav();
}

   @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
   toggle() {
    this.sidenav.toggle();
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
}
