import { Component, OnInit } from '@angular/core';
import { default as UserDetails } from '../../Resources/UserDetails';

export interface UserData {
  lat: number;
  lng: number;
  type: string;
  name: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: UserData[] = UserDetails;
  totalCount = this.users.length;
  constructor() { }

  ngOnInit() {
  }

}
