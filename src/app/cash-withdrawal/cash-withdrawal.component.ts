import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CARD_INFO } from '../shared/constants/user-info';

@Component({
  selector: 'app-cash-withdrawal',
  templateUrl: './cash-withdrawal.component.html',
  styleUrls: ['./cash-withdrawal.component.scss'],
})
export class CashWithdrawalComponent implements OnInit {
  cardInfo = CARD_INFO;
  redirectTo = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  form = this.fb.group({
    amount: ['', [Validators.required]],
  });

  get amountControl() {
    return this.form.controls['amount'] as FormControl;
  }

  ngOnInit(): void {}

  save() {
    if (this.form.valid) {
      if (this.cardInfo.CARD_PIN === this.form.value.pin) {
        this.router.navigateByUrl(this.redirectTo);
      }
    }
  }
}
