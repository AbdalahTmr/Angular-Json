import { TestBed } from '@angular/core/testing';

import { PartformService } from './partform.service';

describe('PartformService', () => {
  let service: PartformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
