import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthTest } from './google-auth-test';

describe('GoogleAuthTest', () => {
  let component: GoogleAuthTest;
  let fixture: ComponentFixture<GoogleAuthTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleAuthTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
