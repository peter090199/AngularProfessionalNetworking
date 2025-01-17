import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEducationDialogComponent } from './add-edit-education-dialog.component';

describe('AddEditEducationDialogComponent', () => {
  let component: AddEditEducationDialogComponent;
  let fixture: ComponentFixture<AddEditEducationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEducationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEducationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
