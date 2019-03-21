import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BadInputError } from '../common/error-handling/bad-input.error';
import { NotFoundError } from '../common/error-handling/not-found.error';
import { AppError } from '../common/error-handling/app.error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  create(resource: any, headers: HttpHeaders) {
    console.log(headers);
    if (!headers) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    return this.http
      .post(this.url, JSON.stringify(resource), {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  read() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  updatePut(resource: any) {
    return this.http
      .put(this.url + '/' + resource.id, JSON.stringify(resource), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(catchError(this.handleError));
  }

  updatePatch(resource: any) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify(resource), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInputError());
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
