import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SigninService } from './signin.service';

@Injectable()
export class SigninGuard implements CanActivate, CanActivateChild {

  constructor(private signinService: SigninService, private router: Router) {
  }

  Varify(jwt: string) {
    return this.signinService.VerifyClientToken(jwt).map((verified) => {
      if (verified) {
        return verified;
      } else if (!verified) {
        this.router.navigate(['']);
        return false;
      }
    }).first();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('client')) {
      let jwt = localStorage.getItem('client');
      return this.Varify(jwt);
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('client')) {
      let jwt = localStorage.getItem('client');
      return this.Varify(jwt);
    }
  }
}

// if (localStorage.getItem('client')) {
//   let jwt = localStorage.getItem('client');
//   return this.signinService.VerifyClientToken(jwt).map((verified) => {
//     if (verified) {
//       return verified;
//     } else if (!verified) {
//       this.router.navigate(['']);
//       return false;
//     }
//   }).first();
// }