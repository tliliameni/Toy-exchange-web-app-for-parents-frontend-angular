import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private  baseUrl = "http://localhost:8090/Profile";
  constructor(private http: HttpClient) { }

  getImage(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/getImage/${id}`, { responseType: 'blob' });
  }
  getPhone(id: number): Observable<string> {

    return this.http.get<string>(`${this.baseUrl}/phone/${id}`);
  }
  getUser(id: number): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }
  updateUser(id: number, file: File, username: string, email: string, phone: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone',phone);

    return this.http.put(`${this.baseUrl}/update/${id}`, formData);
  }

}
