import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawSuccessComponent } from './withdraw-success.component';

describe('WithdrawSuccessComponent', () => {
  let component: WithdrawSuccessComponent;
  let fixture: ComponentFixture<WithdrawSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
