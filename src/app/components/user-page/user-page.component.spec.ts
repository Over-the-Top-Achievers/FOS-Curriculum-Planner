import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from 'src/app/shared/services/user.services';
describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,MatDialogModule,ReactiveFormsModule,MatMenuModule
      ],
      providers:[UserService],
      declarations: [ UserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have missing course 1',()=>{

    component.year1Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"1",
      Course_Name:"test1" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
    }]
    component.year2Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"2",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "1;",
    }]
    component.ValidateCourseRequirements()
    expect(component.MissingFirstYear).toEqual(['None'])
  })
  it('should have missing course 2',()=>{

    component.year1Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"1",
      Course_Name:"test1" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "test2",
      Pre_requisite: "",
    },
    {
      //look u model view controller mvc
      _id : "",
      Course_Code:"1",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "1",
      Pre_requisite: "",
    }]
    component.ValidateCourseRequirements()
    expect(component.MissingFirstYear).toEqual(['None'])
  })
});
