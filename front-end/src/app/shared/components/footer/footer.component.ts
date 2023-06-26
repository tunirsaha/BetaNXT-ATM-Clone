import { Component, OnInit } from '@angular/core';
import { Subject, filter, of, take, takeUntil, tap } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  userLoggedIn = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.storeService.userInfo
      .pipe(
        filter((userInfo) => !!userInfo),
        takeUntil(this.destroy$)
      )
      .subscribe((userInfo) => {
        this.userLoggedIn = userInfo.cardNumber !== '';
      });
  }

  exit() {
    this.authService.killSession();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
