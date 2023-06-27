import { Component, OnInit } from '@angular/core';
import { Subject, filter, of, take, combineLatest, takeUntil, tap } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { UserAuthService } from '../../services/user-auth.service';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userLoggedIn = false;
  adminLoggedIn = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private storeService: StoreService,
    private userAuthService: UserAuthService,
    private adminAuthService: AdminAuthService
  ) {}

  ngOnInit() {
    combineLatest([this.storeService.userInfo, this.storeService.adminInfo])
      .pipe(
        filter(([userInfo, adminInfo]) => !!userInfo || !!adminInfo),
        takeUntil(this.destroy$)
      )
      .subscribe(([userInfo, adminInfo]) => {
        this.userLoggedIn = userInfo.cardNumber !== '';
        this.adminLoggedIn = adminInfo.username !== '';
      });
  }

  exitUser() {
    this.userAuthService.killSession();
  }

  exitAdmin() {
    this.adminAuthService.killSession();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
