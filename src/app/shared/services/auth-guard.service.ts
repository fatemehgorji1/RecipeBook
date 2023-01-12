import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return this.authService.user.pipe(take(1), map(user => {
      const isAuth = !!user; //true
      if (isAuth) {
        return true;
      } else {
        return this.router.navigate(['/auth']);
      }
    }))
  }
}
