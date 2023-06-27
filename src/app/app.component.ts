import { Component, OnInit } from '@angular/core';
import { StoreService } from './shared/services/store.service';
import { INITIAL_ATM_BALANCE } from './shared/models/money';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'atm-app';

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadMoney();
  }

  loadMoney() {
    this.storeService.availableBillValue.next(INITIAL_ATM_BALANCE);
  }
}
