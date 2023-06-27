import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, take } from 'rxjs';
import { Bills } from '../models/money';
import { StoreService } from './store.service';
import * as moment from 'moment';
import { PreUpdate } from '../models/atm-updator';
import { DATE_TIME_FORMAT } from '../constants/system-ui';
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private storeService: StoreService, private router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }

  getArrayOfBillValues() {
    /** returns bill face values like [100,50,10]
    if system has 3 types of bill values
    **/
    return Object.keys(new Bills())
      .map((i) => {
        return parseInt(i.replace('bill_', ''));
      })
      .sort(function (a, b) {
        return a - b;
      })
      .reverse();
  }

  getSumOfTotalBills(denominations: Bills) {
    let sum = 0;
    Object.keys(denominations).forEach((i) => {
      let key = i;
      sum +=
        parseInt(i.replace('bill_', '')) * denominations[key as keyof Bills];
    });
    console.log(sum);
    return sum;
  }

  addBillstoExisting(existingBillData: Bills, surplusBillData: Bills) {
    Object.keys(existingBillData).forEach((i) => {
      existingBillData[i as keyof Bills] += surplusBillData[i as keyof Bills];
    });
    return existingBillData;
  }

  atmBalanceUpdator(amount: number, denominations: Bills): PreUpdate {
    const billsFaceValues: Array<number> = this.getArrayOfBillValues();
    let billCounter: Array<number> = Array(billsFaceValues.length).fill(0);
    let checkSum: number = 0;
    let tempAmount: number = amount;
    let updatedBillCount = new Bills();
    for (let i = 0; i < billsFaceValues.length; i++) {
      let key = 'bill_' + billsFaceValues[i];
      billCounter[i] = Math.floor(tempAmount / billsFaceValues[i]);
      if (billCounter[i] > denominations[key as keyof Bills]) {
        billCounter[i] = denominations[key as keyof Bills];
      }
      updatedBillCount[key as keyof Bills] =
        denominations[key as keyof Bills] - billCounter[i];
      checkSum += billCounter[i] * billsFaceValues[i];
      tempAmount -= billsFaceValues[i] * billCounter[i];
    }
    return {
      updatedBillCount: updatedBillCount,
      checkSum: checkSum,
    };
  }

  checkWithdrawalAmount(amount: number, denominations: Bills) {
    /** checks whether the amount you wish to withdraw
     * agrees with the count of the bills present in the system */
    const data: PreUpdate = this.atmBalanceUpdator(amount, denominations);
    if (amount > data.checkSum) return false;
    else return true;
  }

  makeTransaction(amount: number) {
    combineLatest([
      this.storeService.availableBillValue,
      this.storeService.userInfo,
    ])
      .pipe(
        filter(
          ([availableBillsData, userInfo]) => !!availableBillsData && !!userInfo
        ),
        take(1)
      )
      .subscribe(([availableBillsData, userData]) => {
        const data = this.atmBalanceUpdator(amount, availableBillsData);
        this.storeService.availableBillValue.next(data.updatedBillCount);
        this.storeService.transactions
          .pipe(take(1))
          .subscribe((current: any) => {
            current.push({
              timeStamp: moment().format(DATE_TIME_FORMAT),
              userCard: userData.cardNumber,
              amount: amount * -1,
            });
            this.storeService.transactions.next(current);
          });
        this.storeService.amountWithdrawn.next(amount);
        this.navigate('user/withdraw-success');
      });
  }

  amountValidator(billsFaceValue: Bills): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let amount: number = control.value;
      if (!this.checkWithdrawalAmount(amount, billsFaceValue)) {
        return { custom: true };
      }
      return null;
    };
  }
}
