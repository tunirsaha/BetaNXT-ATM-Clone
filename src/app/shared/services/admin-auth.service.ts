import { Injectable } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { StoreService } from './store.service';
import { UtilityService } from './utility.service';
import { AdminInfo } from '../models/admin-info';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  constructor(
    private storeService: StoreService,
    private utilityService: UtilityService
  ) {}

  killSession() {
    this.storeService.adminInfo.next(new AdminInfo());
    this.utilityService.navigate('admin');
  }
}
