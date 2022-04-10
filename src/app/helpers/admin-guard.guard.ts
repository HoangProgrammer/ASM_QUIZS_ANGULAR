import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router) {}


  canActivate():boolean{
    const login = JSON.parse(localStorage.getItem('user') || '{}');
   let filter =login.roles.filter((item:any )=> item=='admin' )
    if (filter!='') {        
      return true;
    } 
        this.router.navigate(['/']);
         return false;
    
   
  }
   
  
}
