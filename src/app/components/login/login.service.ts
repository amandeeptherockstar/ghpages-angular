import { Injectable, Optional } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService {
  constructor(url: string, http: HttpClient) {
    super(url, http);
  }
}
