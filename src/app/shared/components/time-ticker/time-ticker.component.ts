import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, share, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-time-ticker',
  templateUrl: './time-ticker.component.html',
  styleUrls: ['./time-ticker.component.scss'],
})
export class TimeTickerComponent implements OnInit, OnDestroy {
  rxTime = new Date();
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        map(() => new Date()),
        share()
      )
      .subscribe((time) => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
