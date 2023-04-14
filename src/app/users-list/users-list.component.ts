import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  rows = [
    { col1: 'user1', col2: 'delete user' },
    { col1: 'user2', col2: 'delete user' },
    { col1: 'user3', col2: 'delete user' },
    { col1: 'user4', col2: 'delete user' },
    { col1: 'user5', col2: 'delete user' }
  ];
}
