import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from 'src/app/shared/services/user.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,MatDialogModule,ReactiveFormsModule,MatMenuModule,BrowserAnimationsModule
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

  it('openCourseView should call service',()=>{
    const userServiceSpy= spyOn(component.userService, 'changeMessage').and.callThrough();
    expect(userServiceSpy).not.toHaveBeenCalled()
    component.openCourseView("0")
    expect(userServiceSpy).toHaveBeenCalled()
    component.viewDetailsDialogRef.close()
  })

  it('should total the course credits for 1st year',()=>{
    component.SelectedFirstYearCourses=[{
      _id : "",
      Course_Code:"MATH1036",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
    },
    {
      _id : "",
      Course_Code:"COMS1014",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
    }]
    component.countcoursecredits1()
    expect(component.creditCounter1).toEqual(32)
  })
  it('should total the course credits for 2nd year',()=>{
    component.SelectedSecondYearCourses=[{
      _id : "",
      Course_Code:"MATH2036",
      Course_Name:"" ,
      Credits:"46",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
    },
    {
      _id : "",
      Course_Code:"COMS1014",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
    }]
    component.countcoursecredits2()
    expect(component.creditCounter2).toEqual(62)
  })
  it('should total the course credits for 3rd year',()=>{
    component.SelectedThirdYearCourses=[{
      _id : "",
      Course_Code:"MATH3036",
      Course_Name:"" ,
      Credits:"32",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
    },
    {
      _id : "",
      Course_Code:"COMS1014",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "",
      Semester: "",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
    }]
    component.countcoursecredits3()
    expect(component.creditCounter3).toEqual(48)
  })
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
  it('should have missing course 3',()=>{

    component.year1Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"year3",
      Course_Name:"test3" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "3",
      Co_requisite: "year31",
      Pre_requisite: "",
    },
    {
      //look u model view controller mvc
      _id : "",
      Course_Code:"year31",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "year2",
    }, 
       {
      //look u model view controller mvc
      _id : "",
      Course_Code:"year2",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
    }]
    component.ValidateCourseRequirements()
    expect(component.MissingSecondYear).toEqual(['None'])

  })


});
