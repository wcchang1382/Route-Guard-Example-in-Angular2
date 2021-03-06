import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService  implements CanActivate {

  constructor(private router: Router, public authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //debugger;
      return this.authService.afAuth.authState
                  .take(1)
                  .map(authState => !!authState)
                  .do(authenticated => {
                    if (!authenticated) {
                        alert("Access denied.");
                        this.router.navigate(['about']);
                        return false;
                    } else {
                      return true;
                    }
                  }); //end of do method
  } // end of Observable

}
