import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  cardNumber: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}
}
