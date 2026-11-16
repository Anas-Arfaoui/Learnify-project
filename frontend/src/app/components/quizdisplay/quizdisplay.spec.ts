import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quizdisplay } from './quizdisplay';

describe('Quizdisplay', () => {
  let component: Quizdisplay;
  let fixture: ComponentFixture<Quizdisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quizdisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quizdisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
