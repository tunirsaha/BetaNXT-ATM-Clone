import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { Bills } from '../../shared/models/money';
import * as moment from 'moment';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DATE_TIME_FORMAT } from 'src/app/shared/constants/system-ui';

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
    Object.keys(billData).forEach((i) => {
      this.form.addControl(i, new FormControl(billData[i as keyof Bills], []));
    });
  }

  formatBillFaceValue(text: string) {
    return text.replace('bill_', 'Bills of ');
  }

  updateBalance() {
    if (this.form.valid) {
      this.storeService.transactions.pipe(take(1)).subscribe((current: any) => {
        current.push({
          timeStamp: moment().format(DATE_TIME_FORMAT),
          userCard: 'CASH LOAD BY SYSTEM ADMIN',
          amount: this.utilityService.getSumOfTotalBills(this.form.value),
        });
        this.storeService.transactions.next(current);
      });
      this.storeService.availableBillValue.next(
        this.utilityService.addBillstoExisting(
          this.availableBills,
          this.form.value
        )
      );
      this.form.reset();
      alert('Cash Loaded Successfully');
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
