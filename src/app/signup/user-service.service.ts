import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
    // TODO: Store the user in your backend or local storage
  }

  getUser(username: string): User {
    const user = this.users.find(user => user.username === username);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
    // TODO: Retrieve the user from your backend or local storage
  }

  constructor() { }
}

export interface User {
  username: string;
  password: string;

  // Add additional fields as needed
}
