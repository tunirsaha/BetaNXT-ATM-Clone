import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { UserInfo } from '../models/user-info';
import { Subject } from 'rxjs/internal/Subject';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private storeService: StoreService,
    private utilityService: UtilityService
  ) {}

  authenticate() {}

  killSession() {
    this.storeService.userInfo.next(new UserInfo());
    this.utilityService.navigate('user');
  }
}
