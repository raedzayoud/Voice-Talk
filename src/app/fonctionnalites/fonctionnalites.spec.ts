import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fonctionnalites } from './fonctionnalites';

describe('Fonctionnalites', () => {
  let component: Fonctionnalites;
  let fixture: ComponentFixture<Fonctionnalites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fonctionnalites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fonctionnalites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
