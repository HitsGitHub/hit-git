import { TestBed } from '@angular/core/testing';

import { JsonServiceService } from './json-service.service';

describe('JsonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonServiceService = TestBed.get(JsonServiceService);
    expect(service).toBeTruthy();
  });
});
