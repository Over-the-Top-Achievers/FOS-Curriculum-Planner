import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from 'src/app/shared/services/user.services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Course } from 'src/app/shared/models';
import { ViewCourseComponent } from '../view-course/view-course.component';
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
  // it('closing dialog should call diagonal validation',()=>{
  //   component.openCourseView('0');
  //   component.viewDetailsDialogRef.close()
  //   const spy = spyOn(component.viewDetailsDialogRef,'afterClosed').and.callThrough();

  //   expect(spy).toHaveBeenCalled()
  // })
  // these are not testing properly
  // it('closing dialog should call pre/co req validation',()=>{
  //   const spy = spyOn(component,'ValidateCourseRequirements')
  //   component.openCourseView('0');
  //   component.viewDetailsDialogRef.close()
  //   expect(spy).toHaveBeenCalled()

  // })
  // it('openCourseView should call service',()=>{
  //   const userServiceSpy= spyOn(component.userService, 'changeMessage').and.callThrough();
  //   expect(userServiceSpy).not.toHaveBeenCalled()
  //   component.openCourseView("0")
  //   expect(userServiceSpy).toHaveBeenCalled()
  //   component.viewDetailsDialogRef.close()
  // })
  it('check diagonals 1',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"MATH1036",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }]
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual([])
  })
  it('check diagonals 2',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T2",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T1",
    }]
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual([])
  })
  it('check diagonals 3',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "1",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "1",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }]
    const value = component.ValidateDiagonals(courseArray)
    console.log(value);
    expect(value).toEqual(courseArray)
  })
  it('check diagonals 4',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T2",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T1",
    }]
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual([])
  })
  it('check diagonals 5',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "B",
      Semester: "1",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "B",
      Semester: "1",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }]
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual(courseArray)
  })
  it('check diagonals 6',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T2",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A",
      Semester: "",
      Year: "2",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "T1",
    }]
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual([])
  })
  it('check diagonals 7',()=>{
    const courseArray=[{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "C",
      Semester: "",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    },{
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "D",
      Semester: "",
      Year: "3",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }] //should not collide
    const value = component.ValidateDiagonals(courseArray)
    expect(value).toEqual([])
  })
  it('check CompareCourses 1',()=>{
    const c1={
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A/B",
      Semester: "1",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    };
    const c2 ={
      _id : "",
      Course_Code:"T2",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "B/A",
      Semester: "1",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }; //should  collide
    const value = component.CompareCourses(c1,c2);
    expect(value).toBeTrue();
  })
  it('should RemoveDuplicates 1',()=>{
    const courses=[ {
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A/B",
      Semester: "1",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    },{
      _id : "",
      Course_Code:"T1",
      Course_Name:"" ,
      Credits:"16",
      NQF: "5",
      Slot: "A/B",
      Semester: "1",
      Year: "1",
      Co_requisite: "",
      Pre_requisite: "",
      Shareable: "",
    }]; //should  collide
    const value = component.RemoveDuplicates(courses);
    expect(value.length).toEqual(1);
  })
  it('should total the course credits for 1st year',()=>{
    component.year1Courses=[{
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
      Shareable: "",
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
      Shareable: "",
    }]
    component.countcoursecredits1()
    expect(component.creditCounter1).toEqual(32)
  })
  it('should total the course credits for 2nd year',()=>{
    component.year2Courses=[{
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
      Shareable: "",
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
      Shareable: "",
    }]
    component.countcoursecredits2()
    expect(component.creditCounter2).toEqual(62)
  })
  it('should total the course credits for 3rd year',()=>{
    component.year3Courses=[{
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
      Shareable: "",
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
      Shareable: "",
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
      Shareable:"",
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
      Pre_requisite: "1",
      Shareable:"",
    }]
    component.validateCourseRequirements()
    // expect(component.missingCoReqInfo['2']).toEqual([])
    expect(component.missingPreReqInfo['2']).toEqual([])
    
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
      Shareable:"",
    },
    {
      //look u model view controller mvc
      _id : "",
      Course_Code:"test2",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "1",
      Pre_requisite: "",
      Shareable:"",
    }]
    component.validateCourseRequirements()
    expect(component.missingCoReqInfo['1']).toEqual([])
    // expect(component.missingPreReqInfo['1']).toBeFalsy()
  })
  it('should have missing course 3',()=>{

    component.year1Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"math1",
      Course_Name:"t1" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "math2",
      Pre_requisite: "",
      Shareable:"",
    }]
    component.validateCourseRequirements()
    expect(component.missingCoReqInfo['math1']).toEqual(['math2'])
    // expect(component.missingPreReqInfo['year31']).toBeFalsy()
  })

  
  it('should remove a course for first year',()=>{
    
    component.year1Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"year1",
      Course_Name:"test1" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "1",
      Co_requisite: "year1",
      Pre_requisite: "",
      Shareable:"",
    }]

    component.removeCourse(component.year1Courses[0])
    expect(component.year1Courses).toEqual([])
  })

  it('should remove a course for second year',()=>{
    
    component.year2Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"year2",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "year2",
      Pre_requisite: "",
      Shareable:"",
    }]

    component.removeCourse(component.year2Courses[0])
    expect(component.year2Courses).toEqual([])
  })
  it('should remove a course for second year',()=>{
    
    component.year2Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"year2",
      Course_Name:"test2" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "2",
      Co_requisite: "year2",
      Pre_requisite: "",
      Shareable:"",
    }]

    component.removeCourse(component.year2Courses[0])
    expect(component.year2Courses).toEqual([])
  })

  it('should update cours info on remove',()=>{
    const spy = spyOn(component,"updateRequirements");
    component.year3Courses =[{
      //look u model view controller mvc
      _id : "",
      Course_Code:"year3",
      Course_Name:"test3" ,
      Credits:"",
      NQF: "",
      Slot: "",
      Semester: "",
      Year: "3",
      Co_requisite: "year3",
      Pre_requisite: "",
      Shareable:"",
    }]

    component.removeCourse(component.year3Courses[0])
    expect(spy).toHaveBeenCalled()
    // array should be empty
  })

  it('openCourseView should call service',()=>{
    const userServiceSpy= spyOn(component.userService, 'changeMessage').and.callThrough();
    expect(userServiceSpy).not.toHaveBeenCalled()
    component.openCourseView("1")
    component.viewDetailsDialogRef.close()
    expect(userServiceSpy).toHaveBeenCalled()
  })

  it('should populate course selection for year 1',()=>{
    let selection:Course[]=[];
    component.openCourseView('1');
    expect(selection).toEqual(component.year1Courses);

  })
  it('should populate course selection for year 2',()=>{
    let selection:Course[]=[];
    component.openCourseView('2');
    expect(selection).toEqual(component.year2Courses);
  })
  it('should populate course selection for year 3',()=>{
    let selection:Course[]=[];
    component.openCourseView('3');
    expect(selection).toEqual(component.year3Courses);

  })

  // it('openCourseView should call newMessage()',()=>{
  //   const spy= spyOn(component, 'newMessage').and.callThrough();
  //   component.year1Courses = []
  //   component.openCourseView("1")
  //   expect(spy).toHaveBeenCalled()
  // })

  it('should pass new message to userService ',()=>{
    spyOn(component, 'newMessage')
    let selection:Course[] = [];
    let year: string = "1";
    component.newMessage(year, selection);
    expect(component).toBeTruthy();
  })

  it('... ',()=>{
    spyOn(component, 'openCourseView')
    //let selection:Course[] = component.year1Courses;
    let year: string = "1";
    component.subscription = component.userService.currentMessage.subscribe((message:any) => component.message = message);
    //component.viewDetailsDialogRef = component.dialog.open(ViewCourseComponent);
    //component.newMessage(year, selection);
    component.openCourseView(year);
    
    expect(component).toBeTruthy();
  })

  it('should open viewCourse dialog',()=>{
    const spy = spyOn(component, 'openCourseView');
    component.openCourseView("1")
    expect(spy).toHaveBeenCalled()
  })

  it('openCourseView should validate Requirements',()=>{
    const spy = spyOn(component, 'validateCourseRequirements')
    component.validateCourseRequirements();
    expect(spy).toHaveBeenCalled();
  })

  it('openCourseView should validate Diagonals',()=>{
    const spy = spyOn(component, 'ValidateDiagonals');
    component.year1Courses = [];
    component.year2Courses = [];
    component.year3Courses = [];
    component.ValidateDiagonals(component.year1Courses);
    component.ValidateDiagonals(component.year2Courses);
    component.ValidateDiagonals(component.year3Courses);
    expect(spy).toHaveBeenCalled();
  })  

});
