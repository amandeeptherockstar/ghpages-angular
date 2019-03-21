import { Injectable, Optional } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(@Optional() url: string, http: HttpClient) {
    url = url || 'https://api.github.com/user/5441280';
    console.log(url);
    super(url, http);
  }
}

// 'https://api.github.com/user/5441280'
