import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, filter, take } from 'rxjs';
import { Denominations } from '../models/money';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private storeService: StoreService, private router: Router) {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }

  getArrayOfNoteValues() {
    /** returns denomination values like [100,50,10]
    if system has 3 types of bill values
    **/
    return Object.keys(new Denominations())
      .map((i) => {
        return parseInt(i.replace('d', ''));
      })
      .sort(function (a, b) {
        return a - b;
      })
      .reverse();
  }

  checkNotesFeasibility(amount: number, denominations: Denominations) {
    /** checks whether the amount you wish to withdraw
     * agrees with the count of the notes present in the system */
    const notes: Array<number> = this.getArrayOfNoteValues();
    let notesReqdCounter = Array(notes.length).fill(0);
    for (let i = 0; i < notes.length; i++) {
      let _data: any = denominations;
      if (amount >= notes[i]) {
        notesReqdCounter[i] = Math.floor(amount / notes[i]);
        if (notesReqdCounter[i] > parseInt(_data['d' + notes[i].toString()])) {
          return false;
        }
        amount = amount % notes[i];
      }
    }
    return true;
  }

  makeTransaction(amount: number) {
    const notes: Array<number> = this.getArrayOfNoteValues();
    combineLatest([
      this.storeService.denominationsAvailable,
      this.storeService.userInfo,
    ])
      .pipe(
        filter(
          ([denominationData, userInfo]) => !!denominationData && !!userInfo
        ),
        take(1)
      )
      .subscribe(([denominationData, userData]) => {
        let _denominations: any = denominationData;
        for (let i = 0; i < notes.length; i++) {
          if (amount >= notes[i]) {
            _denominations['d' + notes[i]] =
              _denominations['d' + notes[i]] - Math.floor(amount / notes[i]);
            amount = amount % notes[i];
          }
        }
        this.storeService.denominationsAvailable.next(_denominations);
        this.storeService.transactions.next({
          timeStamp: new Date(),
          userCard: userData.cardNumber,
          amount: amount,
        });
        this.navigate('user/withdraw-success');
      });
  }

  amountValidator(data: Denominations): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let amount: number = control.value;
      if (!this.checkNotesFeasibility(amount, data)) {
        return { custom: true };
      }
      return null;
    };
  }
}
