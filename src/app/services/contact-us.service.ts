import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageContact } from '../Models/PageContact';
import { NewsCount } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

// Base URL
private  baseUrl = "http://localhost:8090/ContactPage";


constructor(private http: HttpClient) { }

createPageContact(PageContactData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');

  return this.http.post(`${this.baseUrl}/create`, PageContactData, { headers: headers });
}
getPageContactById(id: number): Observable<PageContact> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  return this.http.get<PageContact>(`${this.baseUrl}/getById/${id}`,{ headers: headers });
}

getImage(id: number): Observable<any> {

  return this.http.get(`${this.baseUrl}/getImage/${id}`, { responseType: 'blob' });
}
/*updateNews(id: number, newsData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
 /* const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);*/
 /* return this.http.put(`${this.baseUrl}/update/${id}`, newsData,{ headers: headers });
}*/
updatePageContact(id: number, file: File,title: string, description: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);

  return this.http.put(`${this.baseUrl}/update/${id}`, formData);
}


deletePageContact(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}}
