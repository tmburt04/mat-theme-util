import { TestBed } from '@angular/core/testing';

import { ThemeUtilService } from './theme-util.service';

describe('ThemeUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeUtilService = TestBed.get(ThemeUtilService);
    expect(service).toBeTruthy();
  });
});
