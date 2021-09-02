import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminApsComponent } from './admin-aps.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseService } from 'src/app/shared/services/course.services';
import { UserService } from 'src/app/shared/services/user.services';


describe('AdminApsComponent', () => {
  let component: AdminApsComponent;
  let fixture: ComponentFixture<AdminApsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule,MatDialogModule,ReactiveFormsModule,MatMenuModule,FormsModule,BrowserAnimationsModule
        
      ],
      providers:[UserService],
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

  it('should create form',()=>{
    expect(component.updateAPSForm.valid).toBeTruthy()
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id: "",
      Subject: "maths",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    }
    const spy = spyOn(component.updateAPSForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id: "",
      Subject: "maths",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id: "",
      Subject: "physics",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    }
    const spy = spyOn(component.updateAPSForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id: "",
      Subject: "physics",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id: "",
      Subject: "life",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    }
    const spy = spyOn(component.updateAPSForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id: "",
      Subject: "life",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id: "",
      Subject: "lol",
      Level_100_90: "9",
      Level_89_80: "8",
      Level_79_70: "7",
      Level_69_60: "6",
      Level_59_50: "5",
      Level_49_40: "4",
      Level_39_30: "3",
      Level_29_0: "2",
    }
    const spy = spyOn(component.updateAPSForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id: "",
      Subject: "lol",
      Level_100_90: "9",
      Level_89_80: "8",
      Level_79_70: "7",
      Level_69_60: "6",
      Level_59_50: "5",
      Level_49_40: "4",
      Level_39_30: "3",
      Level_29_0: "2",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id: "",
      Subject: "english",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    }
    const spy = spyOn(component.updateAPSForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id: "",
      Subject: "english",
      Level_100_90: "9",
      Level_89_80: "",
      Level_79_70: "",
      Level_69_60: "",
      Level_59_50: "",
      Level_49_40: "",
      Level_39_30: "",
      Level_29_0: "",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course) 
  })

});
