import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem("usr");

    if (token) {
      let decoded = jwt_decode(token);
      if (decoded.data.role == "superAdmin") {

        return true
      } else {
        this.router.navigate(["admin/product_management"]);
        return false

      }
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class SRoleGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem("usr");

    if (token) {
      let decoded = jwt_decode(token);
      if (decoded.data.role == "superAdmin") {
        this.router.navigate(["admin"]);
        return false
      } else {
        return true
      }
    }
  }

}
