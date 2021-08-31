import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDegreeComponent } from './admin-degree.component';

describe('AdminDegreeComponent', () => {
  let component: AdminDegreeComponent;
  let fixture: ComponentFixture<AdminDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
