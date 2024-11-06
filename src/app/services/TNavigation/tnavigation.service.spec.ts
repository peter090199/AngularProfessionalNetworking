import { TestBed } from '@angular/core/testing';

import { TNavigationService } from './tnavigation.service';

describe('TNavigationService', () => {
  let service: TNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
