import { TestBed } from '@angular/core/testing';

import { AuthGuard } from '/home/stinger28/Projects/Curriculum Planner/FOS-Curriculum-Planner/src/app/services/auth-gaurd.service';

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
