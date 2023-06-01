import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { News } from '../Models/news';
import { Article } from '../Models/article';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

// Base URL
private  baseUrl = "http://localhost:8090/Articles";


constructor(private http: HttpClient, private storageService:StorageService,private userService:UserService) { }

/*createArticle(articleData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');

  return this.http.post(`${this.baseUrl}/create`, articleData, { headers: headers });
}*/
createArticle(articleData: FormData,categoryId:number,userId:number): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  const params = new HttpParams()
  .set('categoryId', categoryId)
  .set('userId', userId);

  return this.http.post(`${this.baseUrl}/create`, articleData, { headers,params });
}
getArticlesCount(): Observable<ArticleCount> {
  return this.http.get<ArticleCount>(`${this.baseUrl}/articles/count`);
}
getUserArticles(userId: number): Observable<Article[]> {
  return this.http.get<Article[]>(`${this.baseUrl}/users/${userId}/articles`);
}
/*
/*
createArticle(articleData: FormData, categoryId: number, userId: number): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  articleData.append('categoryId',categoryId.toString());
  articleData.append('userId',userId.toString());

  return this.http.post(`${this.baseUrl}/create`, articleData, { headers: headers });
}

*/

getAllArticles(): Observable<any> {
  return this.http.get(`${this.baseUrl}/all`);
}
getArticleById(articleId: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/getById/${articleId}`).pipe(
    map(article => {
      const username = article.user.username;
      const categoryName = article.category.nom;
      return { ...article, username, categoryName };
    })
  );
}
searchByCategoryName(categoryName: string): Observable<Article[]> {
  return this.http.get<Article[]>(`${this.baseUrl}/search?categoryName=${categoryName}`);
}
getArticlesByMcAndCategory(mc: string, category: string): Observable<Article[]> {
  let url = `${this.baseUrl}/search`;
  if (category) {
    url += `?category=${category}`;
  }
  return this.http.get<Article[]>(url);
}


getAllArticleByMc(mot: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/rechercheParMc/${mot}`);
}

getImage(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/getImage/${id}`, { responseType: 'blob' });
}
updateArticle(id: number, file: File, title: string, description: string,exchange: string,price:string,categoryId:number): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('exchange', exchange);
  formData.append('price', price);
  const params = new HttpParams()
  .set('categoryId', categoryId)
  return this.http.put(`${this.baseUrl}/update/${id}`, formData,{ headers: headers,params:params });
}

deleteArticles(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}
}
export interface ArticleCount {
  count: number;
}
