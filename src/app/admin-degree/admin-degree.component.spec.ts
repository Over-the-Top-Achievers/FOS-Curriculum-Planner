import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDegreeComponent } from './admin-degree.component';

describe('AdminDegreeComponent', () => {
  let component: AdminDegreeComponent;
  let fixture: ComponentFixture<AdminDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('should populate update form',()=>{
    let course:any = {
      //look u model view controller mvc
      _id:"",
      Degree_Name:"degreeTest",
      Firm_Offer:"",
      Waitlist:"",
      Reject:"",
    }
    const spy = spyOn(component.updateDegreeForm,'setValue')
    component.populateUpdate({
      //look u model view controller mvc
      _id:"",
      Degree_Name:"degreeTest",
      Firm_Offer:"",
      Waitlist:"",
      Reject:"",
    })
    delete course._id
    expect(spy).toHaveBeenCalledWith(course)
  
  })
});
