import { TestBed } from '@angular/core/testing';

import { TotalResultsService } from './total-results-service.service';

describe('TotalResultsServiceService', () => {
  let service: TotalResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
