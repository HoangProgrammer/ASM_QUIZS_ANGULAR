import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private BASE_URL ="http://localhost:3000/subjects"
  constructor(private httpClient: HttpClient) { }

  get(text: string=''): Observable<any>{
    return this.httpClient.get<any>(`${this.BASE_URL}?Name_like=`+text);
  }
  getOne(id:number):Observable<any>{
    return this.httpClient.get<any>(`${this.BASE_URL}/`+id);
  }
  create(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.BASE_URL}`,data);
  }
  update(id:any ,data:any):Observable<any>{
    return this.httpClient.put<any>(`${this.BASE_URL}/`+id,data);
  }
  delete(id:any):Observable<any>{
    return this.httpClient.delete<any>(`${this.BASE_URL}/`+id);
  }
  search(string:any){
    return this.httpClient.get<any>(`http://localhost:3000/subjects?q=`+string);
  }
}
