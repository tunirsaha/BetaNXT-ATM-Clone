import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../shared/services/utility.service';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { DELAYS } from '../../shared/constants/system-ui';
import { StoreService } from 'src/app/shared/services/store.service';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-withdraw-success',
  templateUrl: './withdraw-success.component.html',
  styleUrls: ['./withdraw-success.component.scss'],
})
export class WithdrawSuccessComponent implements OnInit {
  withDrawnAmount: number = 0;
  constructor(
    private userAuthService: UserAuthService,
    private storeService: StoreService
  ) {
    this.storeService.amountWithdrawn
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((data) => {
        this.withDrawnAmount = data;
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userAuthService.killSession();
    }, DELAYS.FLOW_END_REDIRECT * 1000);
  }
}
