import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Correctanswers } from './correctanswers';

describe('Correctanswers', () => {
  let component: Correctanswers;
  let fixture: ComponentFixture<Correctanswers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Correctanswers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Correctanswers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
