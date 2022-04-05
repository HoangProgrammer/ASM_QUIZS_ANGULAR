import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {


  BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  get(Url: any):Observable<any>{
 return this.http.get(`${this.BASE_URL}${Url}`)
  }

   create(Url: any,data:any):Observable<any>{
     return this.http.post(`${this.BASE_URL}${Url}`,data)
   }

   update(Url: any, param:any, data:any):Observable<any>{
     return this.http.put(`${this.BASE_URL}${Url}/${param}`,data)
   }

    getOne(url:any):Observable<any>{
      return this.http.get(`${this.BASE_URL}${url}`)
    }
   delete(url:any,id:any):Observable<any>{
     return this.http.delete(`${this.BASE_URL}${url}/${id}`)
   }
  
  saveScore(data:any):Observable<any>{
    return data
  }

}
