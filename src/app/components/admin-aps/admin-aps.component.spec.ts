import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApsComponent } from './admin-aps.component';

describe('AdminApsComponent', () => {
  let component: AdminApsComponent;
  let fixture: ComponentFixture<AdminApsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
