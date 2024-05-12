import { TestBed } from '@angular/core/testing';

import { RandomUsernameService } from './random-username.service';

describe('RandomUsernameService', () => {
  let service: RandomUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
