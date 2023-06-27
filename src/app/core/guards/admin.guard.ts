import { Injectable, OnDestroy } from '@angular/core';
import { CanLoad, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuardService implements CanLoad, OnDestroy {
  isPresent = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private storeService: StoreService,
    private utilityService: UtilityService
  ) {}

  canLoad(): Observable<boolean> | UrlTree {
    return this.storeService.adminInfo.pipe(
      filter((adminInfo) => !!adminInfo),
      takeUntil(this.destroy$),
      map((adminInfo) => {
        if (adminInfo.username === '') {
          this.utilityService.navigate('admin');
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
