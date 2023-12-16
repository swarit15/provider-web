import { TestBed } from '@angular/core/testing';

import { S3UtilService } from './s3-util.service';

describe('S3UtilService', () => {
  let service: S3UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
