import { async, fakeAsync, inject, TestBed } from '@angular/core/testing';

import { AuthGuard } from '../services/auth-gaurd.service';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '.';
import { HomeComponent } from '../components/home/home.component';
describe('AuthGaurdService', () => {
  let service: AuthGuard;
  let httpmock:HttpTestingController;
  let httpclient: HttpClient;
  let router:RouterTestingModule;
  let routerSpy: jasmine.SpyObj<Router>;
  const authMock = jasmine.createSpyObj('AuthenticationService', ['isLoggedIn']);
  const fakeUrls = ['/', '/admin', '/crisis-center', '/a/deep/route'];
  const dummyRoute = {} as ActivatedRouteSnapshot;
  // beforeEach( ()=>{
  //   routerSpy = jasmine.createSpyObj<Router>('router', ['navigate']);
  //   serviceStub = new AuthenticationService(httpclient);
  //   guard = new AuthGuard(serviceStub, routerSpy);
    
  // })
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule]
    });
    service = TestBed.inject(AuthGuard);
    httpclient = TestBed.inject(HttpClient);
    httpmock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(RouterTestingModule)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should call canActivate', () => {
    authMock.isLoggedIn.and.returnValue(true);
    const result = service.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'testUrl'});
    expect(result).toBe(true);
    expect(authMock.redirectUrl).toBeUndefined();
  });

  // it('checks if routes',()=>{
  //   const spy = spyOn(service.router,'navigate')
  //   service.canActivate(dummyRoute,fakeRouterState(fakeUrls[0]))
  //   expect(routerSpy.navigate).toHaveBeenCalled();
  // })

});
function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}
// auth.guard.spec.ts
// import { ActivatedRouteSnapshot, Router } from '@angular/router';

// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';

// describe('AuthGuard (isolated)', () => {
//   beforeEach(() => {
//     routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']); // [1]
//     serviceStub = {}; // [2]
//     guard = new AuthGuard(serviceStub as AuthService, routerSpy); // [3]
//   });

//   const dummyRoute = {} as ActivatedRouteSnapshot;
//   const fakeUrls = ['/', '/admin', '/crisis-center', '/a/deep/route'];
//   let guard: AuthGuard;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let serviceStub: Partial<AuthService>;

//   describe('when the user is logged in', () => {
//     beforeEach(() => {
//       serviceStub.isLoggedIn = true;
//     });
//   });

//   describe('when the user is logged out', () => {
//     beforeEach(() => {
//       serviceStub.isLoggedIn = false;
//     });
//   });
// });