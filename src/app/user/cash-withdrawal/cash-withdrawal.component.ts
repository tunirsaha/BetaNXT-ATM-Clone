import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Bills } from '../../shared/models/money';
import { UserInfo } from '../../shared/models/user-info';
import { StoreService } from '../../shared/services/store.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss'],
})
export class CashWithdrawalComponent implements OnInit {
  availableBillsMsg = '';
  availableBillsData: Bills = new Bills();
  destroy$: Subject<boolean> = new Subject<boolean>();
  userInfo: UserInfo = new UserInfo();

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private utilityService: UtilityService
  ) {}

  form = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
  });

  get amountControl() {
    return this.form.controls['amount'] as FormControl;
  }

  ngOnInit(): void {
    this.getUserData();
    this.getAvailableBills();
  }

  getUserData() {
    this.storeService.userInfo
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((data) => {
        this.userInfo = data;
      });
  }

  getAvailableBills() {
    this.storeService.availableBillValue
      .pipe(
        filter((data) => !!data),
        takeUntil(this.destroy$)
      )
      .subscribe((data: Bills) => {
        this.availableBillsData = data;
        this.amountControl.clearValidators();
        this.amountControl.addValidators([
          Validators.required,
          Validators.min(1),
          this.utilityService.amountValidator(this.availableBillsData),
        ]);
        this.amountControl.updateValueAndValidity({ emitEvent: false });
        const _keys = Object.keys(data);
        for (let i = 0; i < _keys.length; i++) {
          this.availableBillsMsg +=
            _keys[i].replace('bill_', '$') +
            ' x' +
            data[_keys[i] as keyof Bills] +
            ', ';
        }
      });
  }

  save() {
    if (this.form.valid) {
      this.utilityService.makeTransaction(this.form.value.amount);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
