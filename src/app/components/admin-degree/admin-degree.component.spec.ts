import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CourseService } from 'src/app/shared/services/course.services';
import { UserService } from 'src/app/shared/services/user.services';
import { AdminDegreeComponent } from './admin-degree.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('AdminDegreeComponent', () => {
  let component: AdminDegreeComponent;
  let fixture: ComponentFixture<AdminDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,MatDialogModule,ReactiveFormsModule,MatMenuModule,FormsModule,BrowserAnimationsModule
        
      ],
      providers:[UserService],
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

  it('should create form',()=>{
    expect(component.updateDegreeForm.valid).toBeTruthy()
  })

  it("check if it sends the updated values to backend for aps", fakeAsync(() => {
    const body:any = {
      //look u model view controller mvc
      fo_maths :"",
      fo_physics:"",
      fo_english:"",
      fo_aps:"",

      wl_maths:"",
      wl_physics:"",
      wl_aps:"",

      r_maths:"",
      r_physics:"",
      r_english:"",
      r_aps:"",
    };
    spyOn(component.courseService, 'updateDegree').and.returnValue(body)
    component.updateDegree();
    tick();
    const answer:any = {
      //look u model view controller mvc
      fo_maths :"",
      fo_physics:"",
      fo_english:"",
      fo_aps:"",

      wl_maths:"",
      wl_physics:"",
      wl_aps:"",

      r_maths:"",
      r_physics:"",
      r_english:"",
      r_aps:"",
    };
    expect(answer).toEqual(body);
    discardPeriodicTasks()
  }));

  it("check if it sends the new values to backend for aps", fakeAsync(() => {
    const body:any = {
      //look u model view controller mvc
      fo_maths :"",
      fo_physics:"",
      fo_english:"",
      fo_aps:"",

      wl_maths:"",
      wl_physics:"",
      wl_aps:"",

      r_maths:"",
      r_physics:"",
      r_english:"",
      r_aps:"",
    };
    spyOn(component.courseService, 'addNewDegree').and.returnValue(body)
    component.addDegree();
    tick();
    const answer:any = {
      //look u model view controller mvc
      fo_maths :"",
      fo_physics:"",
      fo_english:"",
      fo_aps:"",

      wl_maths:"",
      wl_physics:"",
      wl_aps:"",

      r_maths:"",
      r_physics:"",
      r_english:"",
      r_aps:"",
    };
    expect(answer).toEqual(body);
    discardPeriodicTasks()
  }));


  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc

      Firm_Offer:"-;-;-;-",
      Waitlist:"-;-;-",
      Reject:"-;-;-;-"
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.getDegreeInfo({
      fo_maths :"",
      fo_physics:"",
      fo_english:"",
      fo_aps:"",

      wl_maths:"",
      wl_physics:"",
      wl_aps:"",

      r_maths:"",
      r_physics:"",
      r_english:"",
      r_aps:"",
      
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })


})