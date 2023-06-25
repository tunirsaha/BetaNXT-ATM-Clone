import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = false;
  constructor(private storeService: StoreService, private router: Router) {
    this.storeService.cardNumber.pipe(take(1)).subscribe((cardNumber) => {
      this.isAuthorized = !!cardNumber;
    });
  }

  checkAuthorization(): boolean {
    return this.isAuthorized;
  }

  logOut(): void {
    this.storeService.cardNumber.next('');
    this.router.navigateByUrl('/');
  }
}
