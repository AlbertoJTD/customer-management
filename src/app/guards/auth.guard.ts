import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private angularFireAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(
      map(auth => {
        if (!auth) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}