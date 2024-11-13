import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordUIComponent } from './forgot-password-ui.component';

describe('ForgotPasswordUIComponent', () => {
  let component: ForgotPasswordUIComponent;
  let fixture: ComponentFixture<ForgotPasswordUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
