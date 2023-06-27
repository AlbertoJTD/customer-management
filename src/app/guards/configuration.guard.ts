import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map } from "rxjs";
import { ConfigurationService } from "../services/configuration.service";

@Injectable()
export class ConfigurationGuard implements CanActivate {
  constructor(private router: Router, private configurationService: ConfigurationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.configurationService.getConfiguration().pipe(
      map(configuration => {
        if (configuration.allowRegistration) {
          return true;
        } else {
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}