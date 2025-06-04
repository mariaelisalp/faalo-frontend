import { TestBed } from '@angular/core/testing';

import { PrelineService } from './preline.service';

describe('PrelineService', () => {
  let service: PrelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrelineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
