import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('AuthenticationService', () => {
  let service: AuthenticationService;

  let httpmock:HttpTestingController;
  let httpclient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[AuthenticationService]
  });
    service = TestBed.inject(AuthenticationService);
    httpmock = TestBed.get(HttpTestingController);
    httpclient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fail on empty credentials',()=>{

  })
});
