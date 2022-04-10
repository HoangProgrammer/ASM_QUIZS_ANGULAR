import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private BASE_URL ="http://localhost:3000/subjects/"
  constructor(private httpClient: HttpClient) { }

  get(text: string=''): Observable<any>{
    return this.httpClient.get<any>(`${environment.API_Subject}?Name_like=`+text);
  }
  getOne(id:number):Observable<any>{
    return this.httpClient.get<any>(`${environment.API_Subject}/`+id);
  }
  create(data:any):Observable<any>{
    return this.httpClient.post<any>(`${environment.API_Subject}`,data);
  }
  update(id:any ,data:any):Observable<any>{
    return this.httpClient.put<any>(`${environment.API_Subject}/`+id,data);
  }
  delete(id:any):Observable<any>{
    return this.httpClient.delete<any>(`${environment.API_Subject}/`+id);
  }
  search(string:any){
    return this.httpClient.get<any>(`http://localhost:3000/subjects?q=`+string);
  }
}
