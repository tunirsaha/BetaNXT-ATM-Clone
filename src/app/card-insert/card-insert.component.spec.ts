import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInsertComponent } from './card-insert.component';

describe('CardInsertComponent', () => {
  let component: CardInsertComponent;
  let fixture: ComponentFixture<CardInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
