
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePage } from '../Models/HomePage';


@Injectable({
  providedIn: 'root'
})
export class PageHomeService {

// Base URL
private  baseUrl = "http://localhost:8090/HomePage";


constructor(private http: HttpClient) { }
getAll(): Observable<any> {
  return this.http.get(`${this.baseUrl}/all`);
}
createHomePage(HomePageData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');

  return this.http.post(`${this.baseUrl}/create`,HomePageData, { headers: headers });
}
getHomePageById(id: number): Observable<HomePage> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  return this.http.get<HomePage>(`${this.baseUrl}/getById/${id}`,{ headers: headers });
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
updateHomePage(id: number, photo: File,title: string,subtitle:string, description: string) {
  const formData = new FormData();
  formData.append('file', photo);
  formData.append('title', title);
  formData.append('subtitle', subtitle);
  formData.append('description', description);

  return this.http.put(`${this.baseUrl}/update/${id}`, formData);
}


deleteHomePage(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}}
