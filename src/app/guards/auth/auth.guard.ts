import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const helper = new JwtHelperService();
      let isExpired;
      if (sessionStorage.getItem('token')) {        
        isExpired = helper.isTokenExpired(sessionStorage.getItem('token'));
      }else{
        this.router.navigate(['/login']);
        return false;
      }

      if (isExpired) {
        this.router.navigate(['/login']);
        return false;
      }

      return true
  }
}

