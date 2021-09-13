import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private router:Router) {}
  canActivate(): boolean {
    if (!localStorage.getItem("user-token")) {
      this.router.navigate(["/login"]);
      return false;
    }
    else{
      return true;
    }
  }
}
