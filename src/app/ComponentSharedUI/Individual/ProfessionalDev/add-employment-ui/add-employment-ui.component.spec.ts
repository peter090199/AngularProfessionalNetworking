import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmploymentUiComponent } from './add-employment-ui.component';

describe('AddEmploymentUiComponent', () => {
  let component: AddEmploymentUiComponent;
  let fixture: ComponentFixture<AddEmploymentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmploymentUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmploymentUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
