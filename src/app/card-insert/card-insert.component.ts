import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { CARD_INFO } from '../shared/constants/user-info';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-card-insert',
  templateUrl: './card-insert.component.html',
  styleUrls: ['./card-insert.component.scss'],
})
export class CardInsertComponent implements OnInit {
  isCardInserted = false;
  cardInfo = CARD_INFO;
  redirectTo = '';

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.getQueryParams();
  }

  form = this.fb.group({
    pin: ['', [Validators.minLength(4)]],
  });

  get pinControl() {
    return this.form.controls['pin'] as FormControl;
  }

  getQueryParams() {
    this.route.queryParams
      .pipe(
        take(1),
        filter((data) => !!data)
      )
      .subscribe((params: any) => {
        this.redirectTo = params['for'];
      });
  }

  ngOnInit(): void {
    this.switchToPin(1);
  }

  switchToPin(delay: number) {
    setTimeout(() => {
      this.isCardInserted = true;
      this.storeService.cardNumber.next(this.cardInfo.CARD_NUMBER);
    }, delay * 1000);
  }

  save() {
    if (this.form.valid) {
      if (this.cardInfo.CARD_PIN === this.form.value.pin) {
        this.router.navigateByUrl(this.redirectTo);
      }
    }
  }
}
