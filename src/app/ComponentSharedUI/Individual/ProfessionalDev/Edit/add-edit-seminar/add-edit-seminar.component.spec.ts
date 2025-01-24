import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSeminarComponent } from './add-edit-seminar.component';

describe('AddEditSeminarComponent', () => {
  let component: AddEditSeminarComponent;
  let fixture: ComponentFixture<AddEditSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSeminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
