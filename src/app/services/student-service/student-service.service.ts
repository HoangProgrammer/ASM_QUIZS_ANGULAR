import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService{

  constructor(private httpClient: HttpClient) { }

  // BASE_URL = 'http://localhost:3000/students/';
  fetchAll():Observable<any>{
  return  this.httpClient.get<any>(`${environment.API_STUDENT}`)
  }
  getLogin(keyWord:any,password:any=''):Observable<any>{
    let pass=''
    if(password !=''){
       pass=`&password=${password}`
    }
  return  this.httpClient.get<any>(`${environment.API_STUDENT}?email=${keyWord}${pass}`)
  }

  get(keyWord:string=''):Observable<any>{
  return  this.httpClient.get<any>(`${environment.API_STUDENT}?email_like=${keyWord}`)
  }
  
  getOne(id:any):Observable<any>{
  return  this.httpClient.get<any>(`${environment.API_STUDENT}/`+id)
  }
  
  create(data:any):Observable<any>{
  return  this.httpClient.post<any>(environment.API_STUDENT, data)
  }

  update(id:any,data:any):Observable<any>{
  return  this.httpClient.put<any>(`${environment.API_STUDENT}/${id}`, data)
  }
  
  delete(id:any):Observable<any>{
  return  this.httpClient.delete<any>(`${environment.API_STUDENT}/`+id)
  }

}
