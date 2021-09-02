import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id : "",
      Degree_Name:'degree name',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id : "",
      Degree_Name:'degree name',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
      
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id : "",
      Degree_Name:'computer',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id : "",
      Degree_Name:'computer',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
      
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id : "",
      Degree_Name:'chemistry',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id : "",
      Degree_Name:'chemistry',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
      
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id : "",
      Degree_Name:'bio',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id : "",
      Degree_Name:'bio',
      Firm_Offer:'',
      Waitlist:'',
      Reject:''
      
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

})