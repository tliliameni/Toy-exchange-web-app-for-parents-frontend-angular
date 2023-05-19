import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../Models/news';
import { Category } from '../Models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
// Base URL
private  baseUrl = "http://localhost:8090/Categories";

constructor(private http: HttpClient,private route: ActivatedRoute,
  private router: Router) { }

getCategoryById(id: number): Observable<Category> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  return this.http.get<Category>(`${this.baseUrl}/getById/${id}`,{ headers: headers });
}
createCategories(formData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');

  return this.http.post<any>(`${this.baseUrl}/create`, formData,{ headers: headers });
}
getAllCategories(): Observable<any> {
  return this.http.get(`${this.baseUrl}/all`);
}

getImage(id: number): Observable<any> {

  return this.http.get(`${this.baseUrl}/getImage/${id}`, { responseType: 'blob' });
}
getAllCategoriesByMc(mot: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/rechercheParMc/${mot}`);
}
getByName(nom: string): Observable<Category> {
  return this.http.get<Category>(`${this.baseUrl}/getbyName/${nom}`);
}
updateCategory(id: number, file: File,nom: string): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('nom', nom);
  return this.http.put<any>(`${this.baseUrl}/update/${id}`, formData);
}


deleteCategory(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}


}
