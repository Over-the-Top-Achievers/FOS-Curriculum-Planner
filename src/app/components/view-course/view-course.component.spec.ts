import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Course } from 'src/app/shared/models';
import { UserService } from 'src/app/shared/services/user.services';

import { ViewCourseComponent } from './view-course.component';

describe('ViewCourseComponent', () => {
  let component: ViewCourseComponent;
  let fixture: ComponentFixture<ViewCourseComponent>;
  let spy:any
  const dialogMock = {
    close: () => { }
    };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[UserService,{ provide: MatDialogRef, useValue: dialogMock},
        { provide: MAT_DIALOG_DATA, useValue: {} }],
      declarations: [ ViewCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(" filter should call getCourses ", fakeAsync(() => {
    const response: Course[] = [];
    spy = spyOn(component.courseService, 'getCourses').and.returnValue(of(response))
    component.applyFilter("");
    tick();
    expect(spy).toHaveBeenCalled;
  }));


it('submitSelection should call service',()=>{
  const userServiceSpy= spyOn(component.userService, 'changeCourse').and.callThrough();
  expect(userServiceSpy).not.toHaveBeenCalled()
  component.submitSelection()
  expect(userServiceSpy).toHaveBeenCalled()
})

});


