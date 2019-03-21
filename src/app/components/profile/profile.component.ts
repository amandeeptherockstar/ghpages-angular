import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string;
  constructor(
    private route: ActivatedRoute,
    private uService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // this.route.snapshot.paramMap.get('username');

    // this.route.paramMap.subscribe((param: ParamMap) => {
    //   // console.log(param);
    //   let id = +param.get('id');
    //   let username = param.get('username');
    // });

    // this.route.queryParamMap.subscribe((queryParam: ParamMap) => {
    //   // console.log(queryParam);
    //   let page = queryParam.get('page');
    //   let order = queryParam.get('order');
    //   // console.log(page, order);
    // });

    // combine two observable into one using combineLatest
    const observable = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]);

    observable
      .pipe(
        switchMap((combined: ParamMap[]) => {
          this.userId = combined[0].get('id');
          console.log(+combined[0].get('id'), 'combined');
          // let username = combined[0].get('username');
          // let page = combined[1].get('page');
          // let order = combined[1].get('order');
          // console.log(id, username, page, order);
          console.log(this.userId, 'userid');
          this.uService = new UserService(
            `https://api.github.com/user/${this.userId}`,
            this.http
          );
          return this.uService.read();
        })
      )
      .subscribe(user => console.log(user));

    // we do as per the above as compare to this (using subscribe inside subscribe)
    // observable.subscribe((combined: ParamMap[]) => {
    //   // console.log(obs);
    //   this.userId = +combined[0].get('id');
    //   return this.uService.read().subscribe(obs => console.log(obs));
    // });

    // observable.subscribe(combined => {
    //   this.userId = +combined[0].get('id');
    //   // let username = combined[0].get('username');

    //   // let page = combined[1].get('page');
    //   // let order = combined[1].get('order');

    //   // console.log(id, username, page, order);
    // });
  }
}
