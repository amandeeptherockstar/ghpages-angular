import { Component, OnInit } from '@angular/core';
import { FollowerService } from 'src/app/services/followers.service';
import { Follower } from './../../models/followers.model';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: Follower[] = [];
  constructor(private fservice: FollowerService) {}

  ngOnInit() {
    this.fservice.read().subscribe((followers: any) => {
      this.followers = followers.default || followers;
      console.log(this.followers);
    });
  }
}
