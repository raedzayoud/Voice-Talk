import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Essayer } from './essayer';

describe('Essayer', () => {
  let component: Essayer;
  let fixture: ComponentFixture<Essayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Essayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Essayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
