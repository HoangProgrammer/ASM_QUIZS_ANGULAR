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

    getOne(url:any):Observable<any>{
      return this.http.get(`${this.BASE_URL}${url}`)
    }

  
  saveScore(data:any):Observable<any>{
    return data
  }

}
