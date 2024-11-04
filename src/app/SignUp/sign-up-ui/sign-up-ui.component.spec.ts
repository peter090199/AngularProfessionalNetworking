import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpUIComponent } from './sign-up-ui.component';

describe('SignUpUIComponent', () => {
  let component: SignUpUIComponent;
  let fixture: ComponentFixture<SignUpUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
