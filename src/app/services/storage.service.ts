import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUserById(id: number): any {
    const user = JSON.parse(window.sessionStorage.getItem(USER_KEY)!);
    if (user && user.id === id) {
      return JSON.parse(user);
    }
    return null;
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  private user: any;


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem(USER_KEY)!);
    const roles = user.roles;
    console.log('roles:', roles);
    const role = roles.find((r: any) => r.authority === 'ROLE_ADMIN');
    console.log('role:', role);
    if (role) {
      return true;
    }
    return false;
  }
}
