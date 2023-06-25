import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Route,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route): boolean {
    // const routeData = route?.data;
    // const failSafe = routeData['failSafe'] || '';
    // if (!this.authService.checkAuthorization())
    //   this.router.navigateByUrl(failSafe);
    return this.authService.checkAuthorization();
  }
}
