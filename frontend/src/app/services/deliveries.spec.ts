import { TestBed } from '@angular/core/testing';

import { Deliveries } from './deliveries';

describe('Deliveries', () => {
  let service: Deliveries;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Deliveries);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
