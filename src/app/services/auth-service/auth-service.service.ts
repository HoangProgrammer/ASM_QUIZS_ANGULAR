import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient,
    private router: Router
    ) {}

  Login(email: string, authToken: string): Observable<any> {
    return this.http
      .get<any>(
        `${environment.API_STUDENT}?email=${email}&googleId=${authToken}`
      )
      .pipe(
        map((item: any) => {
          if (item.length > 0) {
            localStorage.setItem('user', JSON.stringify(item[0]));
            return item[0];

          }
          return null;
        })

      )
     

  }


  logout():void{
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }
}
