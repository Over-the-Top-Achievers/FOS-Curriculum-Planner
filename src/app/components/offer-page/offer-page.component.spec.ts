import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { Subject } from 'src/app/shared/models';
import { OfferPageComponent } from './offer-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExpectedConditions } from 'protractor';
import { LocalizedString } from '@angular/compiler';


describe('OfferPageComponent', () => {
  let component: OfferPageComponent;
  let fixture: ComponentFixture<OfferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        Ng2SmartTableModule,
      ],
      providers:[SubjectService],
      declarations: [ OfferPageComponent ]
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

  it ('should determine correct offer type', () =>{
    let physics = ['60','70','80'];
    let subjectMark = 70

    let offer = component.checkSubjectOffer(physics, subjectMark);
    expect(offer).toEqual(1);
  })

  it('should return your offer ', () =>{
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

  it('should return offer type based on total APS', ()=>{
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
});
