import { TestBed } from '@angular/core/testing';

import { HquarterService } from './hquarter.service';

describe('HquarterService', () => {
  let service: HquarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HquarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
