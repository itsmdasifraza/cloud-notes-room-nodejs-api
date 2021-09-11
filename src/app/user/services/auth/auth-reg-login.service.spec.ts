import { TestBed } from '@angular/core/testing';

import { AuthRegLoginService } from './auth-reg-login.service';

describe('AuthRegLoginService', () => {
  let service: AuthRegLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRegLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
