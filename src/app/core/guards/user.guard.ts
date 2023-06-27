import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Injectable({ providedIn: 'root' })
export class UserAuthGuardService implements CanLoad, OnDestroy {
  isPresent = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private storeService: StoreService,
    private utilityService: UtilityService
  ) {}

  canLoad(): Observable<boolean> | UrlTree {
    return this.storeService.userInfo.pipe(
      filter((userInfo) => !!userInfo),
      takeUntil(this.destroy$),
      map((userInfo) => {
        if (userInfo.cardNumber === '') {
          this.utilityService.navigate('user');
        }
        return true;
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
