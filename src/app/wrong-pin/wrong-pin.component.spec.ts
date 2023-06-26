import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongPinComponent } from './wrong-pin.component';

describe('WrongPinComponent', () => {
  let component: WrongPinComponent;
  let fixture: ComponentFixture<WrongPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongPinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
