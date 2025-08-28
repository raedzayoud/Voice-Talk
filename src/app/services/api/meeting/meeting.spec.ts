import { TestBed } from '@angular/core/testing';

import { MeetingService } from '../../api/meeting/meeting';

describe('Meeting', () => {
  let service: MeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
