import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbarCollapsed = false;
  decodedUser = null;
  constructor(public storage: TokenService) {}

  // ngOnInit() {
  //   const token = this.storage.getToken();
  //   if (token) {
  //     // check if the token is valid
  //     const http = new LoginService(
  //       'http://localhost:9090/autologin',
  //       this.http
  //     );
  //     const headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + this.storage.getToken()
  //     });
  //     http.create({}, headers).subscribe(
  //       (data: { message: string; success: boolean; payload: AutoLogin }) => {
  //         console.log(data);
  //         if (data.success) {
  //           this.isLoggedIn = true;
  //         }
  //         console.log(this.isLoggedIn);
  //       },
  //       (error: Response) => {
  //         console.log('Invalid Auth Token, Login now');
  //         // remove the token from localStorge as its not valid now
  //         this.isLoggedIn = false;
  //         this.storage.removeToken();
  //       }
  //     );
  //   }
  //   console.log(this.isLoggedIn);
  // }

  isLoggedIn() {
    const user = this.storage.decodedUser;
    if (!user) {
      this.decodedUser = null;
    } else {
      this.decodedUser = user;
    }
    return !this.decodedUser;
  }

  onChangeNavbarCollapsed() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
