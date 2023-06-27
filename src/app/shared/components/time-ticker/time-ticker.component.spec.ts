import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTickerComponent } from './time-ticker.component';

describe('TimeTickerComponent', () => {
  let component: TimeTickerComponent;
  let fixture: ComponentFixture<TimeTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
