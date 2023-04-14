import { TestBed } from '@angular/core/testing';

import { NewsSerivceService } from './news-serivce.service';

describe('NewsSerivceService', () => {
  let service: NewsSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
