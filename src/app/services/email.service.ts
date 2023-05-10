import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailDetails } from '../Models/EmailDetails';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8090'; // change this to your actual API endpoint

  constructor(private http: HttpClient) { }

  sendSimpleEmail(details: EmailDetails): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/sendMail`, details);
  }

  sendEmailWithAttachment(details: EmailDetails): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/sendMailWithAttachment`, details);
  }
}
