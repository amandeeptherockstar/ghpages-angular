import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  setToken(token) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    return localStorage.removeItem('token');
  }

  get decodedUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const jwtHelper = new JwtHelperService();
    // console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
}
