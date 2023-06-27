import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Bills } from '../models/money';
import { UserInfo } from '../models/user-info';
import { AdminInfo } from '../models/admin-info';
import { Transactions } from '../models/transactions';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(new UserInfo());
  availableBillValue: BehaviorSubject<Bills> = new BehaviorSubject(new Bills());
  adminInfo: BehaviorSubject<AdminInfo> = new BehaviorSubject(new AdminInfo());
  transactions: BehaviorSubject<any> = new BehaviorSubject([]);
  amountWithdrawn: BehaviorSubject<number> = new BehaviorSubject(0);
}
