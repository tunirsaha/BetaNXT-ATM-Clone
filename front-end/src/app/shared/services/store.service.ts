import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Denominations } from '../models/money';
import { UserInfo } from '../models/user-info';
import { AdminInfo } from '../models/admin-info';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(new UserInfo());
  denominationsAvailable: BehaviorSubject<Denominations> = new BehaviorSubject(
    new Denominations()
  );
  adminInfo: BehaviorSubject<AdminInfo> = new BehaviorSubject(new AdminInfo());
  transactions: BehaviorSubject<any> = new BehaviorSubject(null);
}
