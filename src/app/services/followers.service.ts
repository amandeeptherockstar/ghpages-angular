import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Follower } from '../models/followers.model';
import * as data from './fakedata.service.json';

@Injectable({
  providedIn: 'root'
})
export class FollowerService extends DataService {
  constructor(http: HttpClient) {
    super('https://api.github.com/users/mosh-hamedani/followers', http);
  }

  read(): Observable<Follower[]> {
    return of(data);
  }
}
