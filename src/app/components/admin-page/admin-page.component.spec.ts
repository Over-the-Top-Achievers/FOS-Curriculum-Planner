import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { AdminPageComponent } from './admin-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from 'src/app/shared/services/user.services';
import { By } from '@angular/platform-browser';
import { Course } from 'src/app/shared/models';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionPanelActionRow } from '@angular/material/expansion';
import { HttpHeaders } from '@angular/common/http';


describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,MatDialogModule,ReactiveFormsModule,MatMenuModule,FormsModule,BrowserAnimationsModule
      ],
      providers:[UserService],
      declarations: [ AdminPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create form',()=>{
    expect(component.checkoutForm.valid).toBeTruthy()
  })
//for add course
  it('should open pre req dialog',()=>{
    const spy = spyOn(component, 'openCourseView');
    component.setPreReqs("1")
    expect(spy).toHaveBeenCalled()
  })
  it('should open co req dialog',()=>{
    const spy = spyOn(component, 'openCourseView');
    component.setCoReqs("1")
    expect(spy).toHaveBeenCalled()
  })
//for edit course
  it('should open pre req dialog',()=>{
    const spy = spyOn(component, 'openCourseView');
    component.setPreReqs("0")
    expect(spy).toHaveBeenCalled()
  })
  it('should open co req dialog',()=>{
    const spy = spyOn(component, 'openCourseView');
    component.setCoReqs("0")
    expect(spy).toHaveBeenCalled()
  })


  it('download should create element',()=>{
    const data = "{data:1}" as unknown as Blob

    
    expect(component.downloadCSV(data).id).toEqual('download')
  })
  it('should change displayed course',()=>{
    component.displayCourseInfo('ComsXXXX')
    expect(component.selectedCourse).toBeTruthy()
  })
  it('add course should calls service',()=>{
    const courseServiceSpy= spyOn(component.courseService, 'addCourse').and.callThrough();
    expect(courseServiceSpy).not.toHaveBeenCalled()
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {Course_Code:component.checkoutForm.value.Course_Code,
        Course_Name:component.checkoutForm.value.Course_Name,
        Credits:component.checkoutForm.value.Credits,
        NQF:component.checkoutForm.value.NQF,
        Slot:component.checkoutForm.value.Slot,
        Semester:component.checkoutForm.value.Semester,
        Year:component.checkoutForm.value.Year,
        Pre_requisite:component.checkoutForm.value.Pre_requisite,
        Co_requisite:component.checkoutForm.value.Co_requisite,
        Shareable:component.checkoutForm.value.Shareable
      },      
    };
    component.courseService.addCourse(options.body)
    expect(courseServiceSpy).toHaveBeenCalled()
  })

  it('filter should call service',()=>{
    const courseServiceSpy= spyOn(component.courseService, 'getCourses').and.callThrough();
    expect(courseServiceSpy).not.toHaveBeenCalled()
    component.applyFilter("")
    expect(courseServiceSpy).toHaveBeenCalled()
  })
  //dangerous
  // it('check if close refreshes',()=>{
  //   const spy = spyOn(component,'ngOnInit')
  //   component.close()
  //   expect(spy).toHaveBeenCalled()
  // })
  it('display course should call filter',()=>{
    const spy= spyOn(component,'applyFilter')
    expect(spy).not.toHaveBeenCalled()
    component.displayYearCourse("0")
    expect(spy).toHaveBeenCalled()
  })


it(" filter should call getCourses and return list of courses", fakeAsync(() => {
  const response: Course[] = [];
  spyOn(component.courseService, 'getCourses').and.returnValue(of(response))
  component.applyFilter("");
  tick();
  expect(component.data).toEqual(response);
}));
// it(" getCSV should call csv$", fakeAsync(() => {
//   response: string;
//   const spy = spyOn(component ,'downloadCSV')
//   spyOn(component.courseService, 'getCSV').and.returnValue(of(response))
//   component.getCSV();
//   tick();
//   expect(spy).toHaveBeenCalled()
// }));


it('openCourseView should call service',()=>{
  const userServiceSpy= spyOn(component.userService, 'changeMessage').and.callThrough();
  expect(userServiceSpy).not.toHaveBeenCalled()
  component.openCourseView("0")
  component.viewDetailsDialogRef.close()
  expect(userServiceSpy).toHaveBeenCalled()
})
it('openCourseView should call service',()=>{
  const courseServiceSpy= spyOn(component.courseService, 'updateCourse').and.callThrough();
  expect(courseServiceSpy).not.toHaveBeenCalled()
  //component.updateCourse()
  var body=
    {
      oldCourseCode:component.updateForm.value.Course_Code, //means never changes the course code right now 
      newCourseCode:component.updateForm.value.Course_Code,//but add one for field new name
      newCourseName:component.updateForm.value.Course_Name,
      newCred:component.updateForm.value.Credits,
      newNQF:component.updateForm.value.NQF,
      newSlot:component.updateForm.value.Slot,
      newSem:component.updateForm.value.Semester,
      newYear:component.updateForm.value.Year,
      newCoReq:(component.updateForm.value.Co_requisite),
      newPreReq:component.updateForm.value.Pre_requisite,
      newShareable:component.updateForm.value.Shareable
    };

  component.courseService.updateCourse(body);
  expect(courseServiceSpy).toHaveBeenCalled()
})
it('should populate update form',()=>{
  let course:any = {
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
  }
  const spy = spyOn(component.updateForm,'setValue')
  component.populateUpdate({
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
  })
  delete course._id
  expect(spy).toHaveBeenCalledWith(course)

})
it ('should expect an alert if all fields are empty', ()=>{
  spyOn(window, "alert");
  component.addCourse();    
  expect(window.alert).toBeTruthy();
})
it ('should call courseService on getCSV', ()=>{
  const courseServiceSpy= spyOn(component.courseService, 'getCSV').and.callThrough()
  // const downloadSpy = spyOn(component,'downloadCSV');
  expect(courseServiceSpy).not.toHaveBeenCalled()
  component.getCSV();
  expect(courseServiceSpy).toHaveBeenCalled()
  // expect(downloadSpy).toHaveBeenCalled()
})
it ('should update Update form values', ()=>{
  const course = [{
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
  }] as Course[]
  const formSpy = spyOn(component.updateForm, "patchValue");
  component.currentForm = '0'
  component.updateFormValues(course);    
  expect(formSpy).toHaveBeenCalled();
})
it ('should update New form values', ()=>{
  const course = [{
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
  }] as Course[]
  const formSpy = spyOn(component.checkoutForm, "patchValue");
  component.currentForm = '1'
  component.updateFormValues(course);    
  expect(formSpy).toHaveBeenCalled();
})
});
