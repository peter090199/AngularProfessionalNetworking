import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperMasterAdminUIComponent } from './super-master-admin-ui.component';

describe('SuperMasterAdminUIComponent', () => {
  let component: SuperMasterAdminUIComponent;
  let fixture: ComponentFixture<SuperMasterAdminUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperMasterAdminUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperMasterAdminUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
