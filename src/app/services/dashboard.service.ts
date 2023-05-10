import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8090/dashboard';

  constructor(private http: HttpClient) {}


  public getNewUsersByDays(days: number = 7): Observable<NewUserCount[]> {
    const params = { days: days.toString() };
    return this.http.get<NewUserCount[]>(`${this.apiUrl}/new-users`, { params });
  }
  deleteUser(id: number): Observable<void> {
    const url = `${this.apiUrl}/deleteUser/${id}`;
    return this.http.delete<void>(url);
  }
  getAllUsernames() {
    return this.http.get<string[]>(`${this.apiUrl}/allUsers`);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allUsers`);
  }
}
export class NewUserCount {
  date: string;
  count: number;
}

