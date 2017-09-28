import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SigninService } from './signin.service';

@Injectable()
export class SigninGuard implements CanActivate {

  constructor(private signinService: SigninService, private router: Router) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (localStorage.getItem('client')) {
      let jwt = localStorage.getItem('client');
      return this.signinService.VerifyClientToken(jwt).map((verified) => {
        if (verified) {
          return verified;
        } else if (!verified) {
          this.router.navigate(['']);
          return false;
        }
      }).first();
    }
  }
}
