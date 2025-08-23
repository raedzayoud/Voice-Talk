import { TestBed } from '@angular/core/testing';

import { Projets } from '../../api/projects/projets';

describe('Projets', () => {
  let service: Projets;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Projets);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
