import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Article } from './Models/article';

@Injectable({
  providedIn: 'root'
})
export class NewsSerivceService {



  private baseUrl = 'http://localhost:8090/Articles/all';
  addPostURL : string;
  updatepostUrl : string;
  deleteposttUrl : string;

  listData!: Article[];
  public dataForm!:  FormGroup;




  constructor(private http: HttpClient) {

    this.addPostURL = 'http://localhost:8090/News/create';
    this.updatepostUrl = 'http://localhost:8090/Articles/update';
    this.deleteposttUrl = 'http://localhost:8090/Articles/delete';
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }


  createPost(post: object): Observable<any> {
    return this.http.post(`${this.addPostURL}`, post);

  }

  updatePost(id: number, value: any): Observable<any> {
    return this.http.put(`${this.updatepostUrl}/${id}`, value).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );

  }
  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.deleteposttUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
  getPostsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }uploadFile(file: File): Observable<HttpEvent<{}>> {
		const formdata: FormData = new FormData();
		formdata.append('file', file);
		const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
			  reportProgress: true,
			  responseType: 'text'
		});

		return this.http.request(req);
   }
  }
