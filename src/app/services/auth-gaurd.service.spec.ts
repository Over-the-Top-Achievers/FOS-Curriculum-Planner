import { TestBed } from '@angular/core/testing';

import { AuthGuard } from '../services/auth-gaurd.service';

describe('AuthGaurdService', () => {
  let service: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
