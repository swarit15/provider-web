import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ROUTER_URLS } from '../common/router-urls';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(route, state);
};

@Injectable({providedIn: 'root'})
class PermissionsService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if(currentUser?.response?.token) {
      return true;
    }
    return this.logout(state);
  }

  logout(state: RouterStateSnapshot) {
    const extras = { queryParams: {
      returnUrl: state.url
    }};
    this.router.navigate([ROUTER_URLS.LOGIN], extras).then();
    return false;
  }

}