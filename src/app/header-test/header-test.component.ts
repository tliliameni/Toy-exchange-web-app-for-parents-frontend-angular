import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header-test',
  templateUrl: './header-test.component.html',
  styleUrls: ['./header-test.component.css']
})
export class HeaderTestComponent  {
  [x: string]: any;
  isLoggedIn = false;
  username?: string;
imagedataurl:string;
  constructor(private authService: AuthService,private storageService: StorageService,private profileService:ProfileService) { }

    ngOnInit() {
      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        const user = this.storageService.getUser();
        this.profileService.getImage(user.id).subscribe(
          data=>{
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = () => {
              user.imagedataUrl = reader.result as string;
              this.imagedataurl=user.imagedataUrl;
            };
            console.log(user.imagedataUrl);
          },
        error => console.log(error)
      );

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
