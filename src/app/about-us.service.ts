import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  private aboutUsUrl = 'http://localhost:8090/AboutUs';

  constructor(private http: HttpClient) { }

  getAboutUsById(id: number): Observable<any> {
    const url = `${this.aboutUsUrl}/getById/${id}`;
    return this.http.get<any>(url);
  }

  getAboutUsImage(id: number): Observable<any> {
    const url = `${this.aboutUsUrl}/getImage/${id}`;
    return this.http.get<any>(url, { responseType: 'blob' as 'json' });
  }

  createAboutUs(title: string, description: string, file: File): Observable<any> {
    const url = `${this.aboutUsUrl}/create`;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);
    return this.http.post<any>(url, formData);
  }

  updateAboutUs(id: number, title: string, description: string, file: File): Observable<any> {
    const url = `${this.aboutUsUrl}/update/${id}`;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }
    return this.http.put<any>(url, formData);
  }

  deleteAboutUs(id: number): Observable<any> {
    const url = `${this.aboutUsUrl}/delete/${id}`;
    return this.http.delete<any>(url);
  }
}
