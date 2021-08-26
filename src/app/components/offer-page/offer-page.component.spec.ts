import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { Subject } from 'src/app/shared/models';
import { OfferPageComponent } from './offer-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatDialog } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExpectedConditions } from 'protractor';


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
});
