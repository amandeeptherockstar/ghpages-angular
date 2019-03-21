import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from 'src/app/services/token.service';

interface DecodedUser {
  admin: boolean;
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  decodedUser: DecodedUser;
  constructor(private storage: TokenService) {}

  get decodeUser() {
    const user: DecodedUser = this.storage.decodedUser;
    if (!user) {
      this.decodedUser = null;
      return false;
    }
    this.decodedUser = user;
    // console.log(this.decodedUser);
    return true;
  }
}
