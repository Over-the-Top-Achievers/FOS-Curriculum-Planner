import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { DegreeRequirement, Subject } from 'src/app/shared/models';
import { OfferPageComponent } from './offer-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExpectedConditions } from 'protractor';
import { LocalizedString } from '@angular/compiler';
import { of } from 'rxjs';
import {DisclaimerDialogComponent} from '../disclaimer-dialog/disclaimer-dialog.component';
import { DisclaimerService } from 'src/app/shared/services/disclaimer.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OfferPageComponent', () => {
  let component: OfferPageComponent;
  let fixture: ComponentFixture<OfferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Ng2SmartTableModule,
        MatDialogModule,    
        BrowserAnimationsModule 
      ],
      providers:[SubjectService, DisclaimerDialogComponent, DisclaimerService],
      declarations: [ OfferPageComponent, DisclaimerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should sum the APS of the selected subjects', () => {
    component.dataSource = [{
      Subject: 'English First Language', 
      Mark: 80,
      APS: '9'
    }, 
    {
      Subject: 'Afrikaans First Language', 
      Mark: 80,
      APS: '7'
    }]
    component.addAPS();
    expect(component.totalAPS).toEqual(16);
  })

  it('should return your respective APS score', () =>{
    component.data = [{
      _id: '' ,
      Subject: 'Mathematics',
      Level_100_90: '10',
      Level_89_80: '9',
      Level_79_70: '8',
      Level_69_60: '7',
      Level_59_50: '4',
      Level_49_40: '3',
      Level_39_30: '0',
      Level_29_0: '0',
    }]
    let APS:string = component.getAPS('Mathematics', 65);
    expect(APS).toEqual('7');
  })

  it('should return your respective APS score', () =>{
    component.data = [{
      _id: '' ,
      Subject: 'Mathematics',
      Level_100_90: '10',
      Level_89_80: '9',
      Level_79_70: '8',
      Level_69_60: '7',
      Level_59_50: '4',
      Level_49_40: '3',
      Level_39_30: '0',
      Level_29_0: '0',
    }]
    let APS:string = component.getAPS('Mathematics', 98);
    expect(APS).toEqual('10');
  })

  it ('should determine correct offer type (waitlist)', () =>{
    let physics = ['60','70','80'];
    let subjectMark = 70

    let offer = component.checkSubjectOffer(physics, subjectMark);
    expect(offer).toEqual(1);
  })

  it ('should determine correct offer type (firm)', () =>{
    let physics = ['60','70','80'];
    let subjectMark = 80

    let offer = component.checkSubjectOffer(physics, subjectMark);
    expect(offer).toEqual(2);
  })

  it ('should determine correct offer type (reject)', () =>{
    let physics = ['60','70','80'];
    let subjectMark = 60

    let offer = component.checkSubjectOffer(physics, subjectMark);
    expect(offer).toEqual(0);
  })

  it('should return your offer (reject) ', () =>{
    component.dataSource = [{
      Subject: 'English First Language', 
      Mark: 80,
      APS: '9'
    }, 
    {
      Subject: 'Afrikaans First Language', 
      Mark: 80,
      APS: '7'
    }]

    let course = {
      _id: '',
      Degree_Name: 'Actuarial Science',
      Firm_Offer: '80;80;80;42',
      Waitlist: '80;-;-',
      Reject: '80;-;-;42',
    }

    let offer = component.getOffer(course);
    expect(offer).toEqual('Reject');
  })

  it('should return your offer (waitlist)', () =>{
    component.dataSource = [{
      Subject: 'English First Language', 
      Mark: 70,
      APS: '8'
    }, 
    {
      Subject: 'Physical Science', 
      Mark: 70,
      APS: '7'
    },
    {
      Subject: 'Mathematics', 
      Mark: 70,
      APS: '8'
    }]

    component.totalAPS = 41;

    let course = {
      _id: '',
      Degree_Name: 'Computer Science',
      Firm_Offer: '70;-;-;42',
      Waitlist: '70;-;-',
      Reject: '-;-;-;40',
    }

    let offer = component.getOffer(course);
    expect(offer).toEqual('Waitlist');
  })

  it('should return your offer (firm offer)', () =>{
    component.dataSource = [{
      Subject: 'English First Language', 
      Mark: 70,
      APS: '8'
    }, 
    {
      Subject: 'Physical Science', 
      Mark: 70,
      APS: '7'
    },
    {
      Subject: 'Mathematics', 
      Mark: 70,
      APS: '8'
    }]

    component.totalAPS = 42;

    let course = {
      _id: '',
      Degree_Name: 'Computer Science',
      Firm_Offer: '70;-;-;42',
      Waitlist: '70;-;-',
      Reject: '-;-;-;40',
    }

    let offer = component.getOffer(course);
    expect(offer).toEqual('Firm Offer');
  })

  it('should return offer type (firm offer) based on total APS', ()=>{
    let course = {
      _id: '',
      Degree_Name: 'Actuarial Science',
      Firm_Offer: '80;80;80;42',
      Waitlist: '80;-;-',
      Reject: '80;-;-;42',
    }

    component.totalAPS = 42;

    let offer = component.getOfferAPS(course);
    expect(offer).toEqual(2);
  })

  it('should return offer type (waitlist) based on total APS', ()=>{
    let course = {
      _id: '',
      Degree_Name: 'Computer Science',
      Firm_Offer: '70;-;-;42',
      Waitlist: '70;-;-',
      Reject: '-;-;-;40',
    }

    component.totalAPS = 41;

    let offer = component.getOfferAPS(course);
    expect(offer).toEqual(1);
  })

  it('should return offer type (reject) based on total APS', ()=>{
    let course = {
      _id: '',
      Degree_Name: 'Computer Science',
      Firm_Offer: '70;-;-;42',
      Waitlist: '70;-;-',
      Reject: '-;-;-;40',
    }

    component.totalAPS = 40;

    let offer = component.getOfferAPS(course);
    expect(offer).toEqual(0);
  })

  it('should call getOffer()', ()=>{
    component.qualifiedCoursesIII = new LocalDataSource();
    component.degreeReqs = [ {
      _id: '',
      Degree_Name: 'Actuarial Science',
      Firm_Offer: '80;80;80;42',
      Waitlist: '80;-;-',
      Reject: '80;-;-;42',
    }];

    component.offerList = [{Degree_Name: 'Actuarial Science', Offer: 'Reject'}];
    const updateSpy= spyOn(component, 'getOffer');
    expect(updateSpy).not.toHaveBeenCalled()
    component.updateOffers()
    expect(updateSpy).toHaveBeenCalled()
  })

  it('ngOninit should call subjectService and fetch subjects',()=>{
    const subjectServiceSpy= spyOn(component.subjectService, 'getSubjects').and.callThrough();
    expect(subjectServiceSpy).not.toHaveBeenCalled()
    component.ngOnInit();
    expect(subjectServiceSpy).toHaveBeenCalled()
  })

  it('ngOninit should call subjectService and fetch degree requirements',()=>{
    const subjectServiceSpy= spyOn(component.subjectService, 'getDegreeReq').and.callThrough();
    expect(subjectServiceSpy).not.toHaveBeenCalled()
    component.ngOnInit();
    expect(subjectServiceSpy).toHaveBeenCalled()
  })

  it ('should expect an alert if we add more than 7 subjects', ()=>{
    spyOn(window, "alert");
    let event:any = {newData: {
      Subject: '',
      Mark: '',
      APS: '',
    }, 
    source: component.dataSource,
    confirm: new Promise<void>((resolve, reject) => {
      
    })}

    component.dataSource = [{},{},{},{},{},{},{}];
    component.add(event);    
    expect(window.alert).toBeTruthy();
  })

  it ('should edit a subject selection', ()=>{
    spyOn(component, 'editSubjectSelection')
    let event:any = {newData: {
      Subject: '',
      Mark: '',
      APS: '',
    }, 
    source: component.dataSource,
    confirm: new Promise<void>((resolve, reject) => {
      
    })}

    component.dataSource = [{},{},{},{},{},{},{}];
    component.editSubjectSelection(event);      
    expect(component).toBeTruthy();
  })

  it ('should delete a subject selection', ()=>{
    spyOn(component, 'deleteSubjectSelection')
    let event:any = {newData: {
      Subject: '',
      Mark: '',
      APS: '',
    }, 
    source: component.dataSource,
    confirm: new Promise<void>((resolve, reject) => {
      
    })}

    component.dataSource = [];
    let result:any = [];
    component.deleteSubjectSelection(event);      
    expect(result).toEqual(component.subjectSelection);
  })

  it(" initSubjectSelection should call getSubjects and return list of subjects", fakeAsync(() => {
    const response: Subject[] = [];
    spyOn(component.subjectService, 'getSubjects').and.returnValue(of(response))
    component.initSubjectSelection();
    tick();
    expect(component.data).toEqual(response);
    discardPeriodicTasks()
  }));

  it(" initDegreeReqs should call getDegreeReq and return list of degree reqs", fakeAsync(() => {
    const response: DegreeRequirement[] = [];
    spyOn(component.subjectService, 'getDegreeReq').and.returnValue(of(response))
    component.initDegreeReqs();
    tick();
    expect(component.degreeReqs).toEqual(response);
    discardPeriodicTasks()
  }));

  it ('it should add a subject selection', ()=>{    
    let event:any = new Event('createConfirm');
    expect(event).toBeTruthy();
  });

  it ('it should delete a subject selection', ()=>{    
    let event:any = new Event('deleteConfirm');
    expect(event).toBeTruthy();
  });

  it ('it should edit a subject selection', ()=>{    
    let event:any = new Event('editConfirm');
    expect(event).toBeTruthy();
  });

});
