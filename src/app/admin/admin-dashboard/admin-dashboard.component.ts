import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { Bills } from '../../shared/models/money';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  step = 1;
  availableBills: Bills = new Bills();
  transactions = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  form = this.fb.group({});

  constructor(private storeService: StoreService, private fb: FormBuilder) {}

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
        this.generateLoadCashForm(this.availableBills);
        this.transactions = transactionData;
      });
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
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
