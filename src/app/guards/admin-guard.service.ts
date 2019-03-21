import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { TokenService } from '../services/token.service';
import { AutoLogin } from '../components/login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private storage: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: AutoLogin = this.storage.decodedUser;
    if (user && user.admin) {
      return true;
    } else {
      this.router.navigate(['/notauthorized']);
      return false;
    }
  }
}
