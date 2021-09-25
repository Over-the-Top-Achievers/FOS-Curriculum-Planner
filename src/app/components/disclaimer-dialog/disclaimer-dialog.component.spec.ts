import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisclaimerService } from 'src/app/shared/services/disclaimer.service';

import { DisclaimerDialogComponent } from './disclaimer-dialog.component';

describe('DisclaimerDialogComponent', () => {
  let component: DisclaimerDialogComponent;
  let fixture: ComponentFixture<DisclaimerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,    
        BrowserAnimationsModule 
      ],
      providers:[ DisclaimerService ],
      declarations: [ DisclaimerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open pre req dialog',()=>{
    const spy = spyOn(component, 'openDialog').and.callThrough();
    component.openDialog();
    expect(spy).toHaveBeenCalled()
  })
});
