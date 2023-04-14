import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;

  constructor() { }

  login() {
    // Login code here
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    // Logout code here
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn():boolean {
    return this.loggedIn || localStorage.getItem('loggedIn') === 'true';
  }
}
