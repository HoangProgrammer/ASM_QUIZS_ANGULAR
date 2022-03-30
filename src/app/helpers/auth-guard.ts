import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const login = JSON.parse(localStorage.getItem('user') || '{}');
    if (
      login.email == undefined ||
      login.email == '' ||
      login.googleId == undefined ||
      login.googleId == ''
    ) {     
    this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
