import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router) { }

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
