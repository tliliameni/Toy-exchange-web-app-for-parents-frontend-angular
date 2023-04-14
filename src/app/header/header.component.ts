import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
[x: string]: any;
constructor(private loginService: LoginService) { }

  ngOnInit() {

  }
isLoggedIn() {
  return this.loginService.isLoggedIn();
}

}
