import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUIComponent } from './profile-ui.component';

describe('ProfileUIComponent', () => {
  let component: ProfileUIComponent;
  let fixture: ComponentFixture<ProfileUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
