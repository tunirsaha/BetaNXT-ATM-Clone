import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { USER_INFO, UserInfo } from '../../shared/models/user-info';
import { StoreService } from '../../shared/services/store.service';
import { UtilityService } from '../../shared/services/utility.service';
import { DELAYS } from '../../shared/constants/system-ui';

@Component({
  selector: 'app-card-insert',
  templateUrl: './card-insert.component.html',
  styleUrls: ['./card-insert.component.scss'],
})
export class CardInsertComponent implements OnInit {
  isCardInserted = false;
  userInfo: UserInfo = new UserInfo();
  redirectTo = '';

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) {
    this.getQueryParams();
  }

  form = this.fb.group({
    pin: ['', [Validators.required, Validators.minLength(4)]],
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
    this.storeService.userInfo
      .pipe(
        filter((userInfo) => !!userInfo),
        take(1)
      )
      .subscribe((userInfo) => {
        if (!userInfo.cardNumber) this.readUserCard(DELAYS.CARD_READ);
        else this.isCardInserted = true;
      });
  }

  readUserCard(delay: number) {
    setTimeout(() => {
      this.userInfo = USER_INFO;
      this.storeService.userInfo.next(this.userInfo);
      this.isCardInserted = true;
    }, delay * 1000);
  }

  save() {
    if (this.form.valid) {
      if (this.userInfo.cardPin === this.form.value.pin) {
        this.utilityService.navigate('user/' + this.redirectTo);
      } else {
        this.utilityService.navigate('user/wrong-pin');
      }
    }
  }
}
