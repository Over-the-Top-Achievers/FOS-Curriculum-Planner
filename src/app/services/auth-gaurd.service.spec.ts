import { TestBed } from '@angular/core/testing';

import { AuthGuard } from '../services/auth-gaurd.service';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
describe('AuthGaurdService', () => {
  let service: AuthGuard;

  let httpmock:HttpTestingController;
  let httpclient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule]
    });
    service = TestBed.inject(AuthGuard);
    httpclient = TestBed.inject(HttpClient);
    httpmock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
