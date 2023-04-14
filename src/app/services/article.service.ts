import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../Models/news';
import { Article } from '../Models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

// Base URL
private  baseUrl = "http://localhost:8090/Articles";


constructor(private http: HttpClient) { }

createArticle(articleData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');

  return this.http.post(`${this.baseUrl}/create`, articleData, { headers: headers });
}
getAllArticles(): Observable<any> {
  return this.http.get(`${this.baseUrl}/all`);
}
getArticleById(id: number): Observable<Article> {
  return this.http.get<Article>(`${this.baseUrl}/getById/${id}`);
}
getAllArticleByMc(mot: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/rechercheParMc/${mot}`);
}

getImage(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/getImage/${id}`, { responseType: 'blob' });
}
updateArticle(id: number, file: File, title: string, description: string,exchange: string,price:string): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('exchange', exchange);
  formData.append('price', price);
  return this.http.put(`${this.baseUrl}/update/${id}`, formData,{ headers: headers });
}

deleteArticles(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}
}
