import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { Bills } from '../../shared/models/money';
import * as moment from 'moment';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  step = 1;
  availableBills: Bills = new Bills();
  updatedBills: Bills = new Bills();
  transactions = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  form = this.fb.group({});

  constructor(
    private utilityService: UtilityService,
    private storeService: StoreService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.storeService.availableBillValue,
      this.storeService.transactions,
    ])
      .pipe(
        filter(
          ([billData, transactionData]) => !!billData && !!transactionData
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(([billData, transactionData]) => {
        this.availableBills = billData;
        this.transactions = transactionData;
      });

    this.generateLoadCashForm(this.updatedBills);
  }

  generateLoadCashForm(billData: Bills) {
    Object.keys(this.availableBills).forEach((i) => {
      this.form.addControl(i, new FormControl(billData[i as keyof Bills], []));
    });
  }

  formatBillFaceValue(text: string) {
    return text.replace('bill_', 'Bills of ');
  }

  updateBalance() {
    this.storeService.transactions.pipe(take(1)).subscribe((current: any) => {
      current.push({
        timeStamp: moment().format('L hh:mm:ss a'),
        userCard: 'CASH LOAD BY SYSTEM ADMIN',
        amount: this.utilityService.getSumOfTotalBills(this.updatedBills),
      });
      this.storeService.transactions.next(current);
    });
    this.storeService.availableBillValue.next(this.updatedBills);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}