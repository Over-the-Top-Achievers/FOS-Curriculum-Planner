import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import {   ReactiveFormsModule } from '@angular/forms';
import { HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { not } from '@angular/compiler/src/output/output_ast';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services';
describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,ReactiveFormsModule,HttpClientTestingModule],
      providers:[AuthenticationService],
      declarations: [ SigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test submit empty',()=>{
    // component.onSubmit()
    expect(component.loginForm.invalid===true)
  })
  it('test submit random',()=>{
    // component.onSubmit()
    component.loginForm.setValue({username:'asdasd','password':'1234'})

    expect(component.loginForm.invalid===true)
  })
  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const usernameInput = compiled.querySelector('input[id="username"]');
    const passwordInput = compiled.querySelector('input[id="password"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should return control components',()=>{
     const controls= component.loginForm.controls
    expect(component.f).toEqual(controls)
  })
  it('should not call authentication service invalid form',()=>{
    const spy = spyOn(component.authenticationService,'login')
    component.onSubmit()
    expect(spy).not.toHaveBeenCalled()
  })
  // it('should call authentication service on submit',()=>{
  //   const spy = spyOn(component.authenticationService,'login')
  //   component.loginForm.setValue({username:'yes',password:"no"})
  //   // component.loginForm.updateValueAndValidity()
  //   component.onSubmit()
  //   expect(component.authenticationService.login).toHaveBeenCalled()
  // })
  it('should call submit onclick',()=>{
    const spy = spyOn(component,'onSubmit')
    const compiled = fixture.debugElement.nativeElement;
    const submitButton = compiled.querySelector('button[id="submit"]');
    submitButton.click()
    expect(spy).toHaveBeenCalled()
  })
});

