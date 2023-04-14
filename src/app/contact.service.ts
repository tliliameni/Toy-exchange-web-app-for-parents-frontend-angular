import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from 'jquery';
import { map } from 'rxjs/internal/operators/map';
imports: [
  HttpClientModule
  ]

@Injectable({
  providedIn: 'root'
})

export class ContactService {
private api='https://mailthis.to/toytroc'
  constructor(private http:HttpClient) { }
  PostMessage(input:any){
return this.http.post(this.api, input,{responseType:'text'}).pipe(
map(
  (response: any)=>{
    if  (response){
      return response;
    }
  },
  (error:any)=>{
    return error;
  }
)
)
  }
}
