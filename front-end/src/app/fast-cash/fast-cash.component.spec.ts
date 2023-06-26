import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCashComponent } from './fast-cash.component';

describe('FastCashComponent', () => {
  let component: FastCashComponent;
  let fixture: ComponentFixture<FastCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
