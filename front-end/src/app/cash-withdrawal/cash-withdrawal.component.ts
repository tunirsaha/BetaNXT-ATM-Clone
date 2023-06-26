import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Denominations } from '../shared/models/money';
import { UserInfo } from '../shared/models/user-info';
import { StoreService } from '../shared/services/store.service';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss'],
})
export class CashWithdrawalComponent implements OnInit {
  availableDenominationsMsg = '';
  availableDenominationData: Denominations = new Denominations();
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
    this.getAvailableDenominations();
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

  getAvailableDenominations() {
    this.storeService.denominationsAvailable
      .pipe(
        filter((data) => !!data),
        takeUntil(this.destroy$)
      )
      .subscribe((data: any) => {
        this.availableDenominationData = data;
        this.amountControl.clearValidators();
        this.amountControl.addValidators([
          Validators.required,
          Validators.min(1),
          this.utilityService.amountValidator(this.availableDenominationData),
        ]);
        this.amountControl.updateValueAndValidity({ emitEvent: false });
        const _keys = Object.keys(data);
        for (let i = 0; i < _keys.length; i++) {
          this.availableDenominationsMsg +=
            _keys[i].replace('d', '$') + ' x' + data[_keys[i]] + ', ';
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
