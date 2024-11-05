import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPortalComponent } from './users-portal.component';

describe('UsersPortalComponent', () => {
  let component: UsersPortalComponent;
  let fixture: ComponentFixture<UsersPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
