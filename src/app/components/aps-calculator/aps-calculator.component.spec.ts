import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsCalculatorComponent } from './aps-calculator.component';

describe('ApsCalculatorComponent', () => {
  let component: ApsCalculatorComponent;
  let fixture: ComponentFixture<ApsCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApsCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
