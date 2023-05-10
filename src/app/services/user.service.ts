import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '../Models/User';

const USER_KEY = 'auth-user';
const API_URL = 'http://localhost:8090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }
  getUserById(id: number): Observable<User> {

    return this.http.get<User>(`http://localhost:8090/api/auth/getUserById`);
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  isAdmin(): boolean {
    const user = this.storageService.getUser();
    const roless = user.roles;
    console.log('roles:', roless);
    //const role = roles.find((r: any) => r.authority === 'ROLE_ADMIN');
    //console.log('role:', role);
    if (user.roles=='ROLE_ADMIN') {
      return true;
    }
    return false;
  }

}
