import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createadmin } from './createadmin';

describe('Createadmin', () => {
  let component: Createadmin;
  let fixture: ComponentFixture<Createadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
