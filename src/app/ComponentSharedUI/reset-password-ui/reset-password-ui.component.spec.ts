import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordUIComponent } from './reset-password-ui.component';

describe('ResetPasswordUIComponent', () => {
  let component: ResetPasswordUIComponent;
  let fixture: ComponentFixture<ResetPasswordUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
