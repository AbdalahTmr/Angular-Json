import { TestBed } from '@angular/core/testing';

import { EvenformService } from './evenform.service';

describe('EvenformService', () => {
  let service: EvenformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
