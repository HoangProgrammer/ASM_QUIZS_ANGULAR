import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService{

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:3000/students';
  fetchAll():Observable<any>{
  return  this.httpClient.get<any>(`${this.BASE_URL}`)
  }
  getLogin(keyWord:any,password:any=''):Observable<any>{
    let pass=''
    if(password !=''){
       pass=`&password=${password}`
    }
  return  this.httpClient.get<any>(`${this.BASE_URL}?email=${keyWord}${pass}`)
  }

  get(keyWord:string=''):Observable<any>{
  return  this.httpClient.get<any>(`${this.BASE_URL}?email_like=${keyWord}`)
  }
  
  getOne(id:any):Observable<any>{
  return  this.httpClient.get<any>(`${this.BASE_URL}/`+id)
  }
  
  create(data:any):Observable<any>{
  return  this.httpClient.post<any>(this.BASE_URL, data)
  }

  update(id:any,data:any):Observable<any>{
  return  this.httpClient.put<any>(`${this.BASE_URL}/${id}`, data)
  }
  
  delete(id:any):Observable<any>{
  return  this.httpClient.delete<any>(`${this.BASE_URL}/`+id)
  }

}
