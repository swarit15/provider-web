import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';
import { HttpClientModule } from '@angular/common/http';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
