import { TestBed } from '@angular/core/testing';

import { PageMentionLegalService } from './page-mention-legal.service';

describe('PageMentionLegalService', () => {
  let service: PageMentionLegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageMentionLegalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
