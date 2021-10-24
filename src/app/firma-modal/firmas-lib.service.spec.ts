import { TestBed } from '@angular/core/testing';

import { FirmasLibService } from './firmas-lib.service';

describe('FirmasLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirmasLibService = TestBed.get(FirmasLibService);
    expect(service).toBeTruthy();
  });
});
