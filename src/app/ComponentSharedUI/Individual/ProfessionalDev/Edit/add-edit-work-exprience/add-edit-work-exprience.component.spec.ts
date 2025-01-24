import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkExprienceComponent } from './add-edit-work-exprience.component';

describe('AddEditWorkExprienceComponent', () => {
  let component: AddEditWorkExprienceComponent;
  let fixture: ComponentFixture<AddEditWorkExprienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkExprienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkExprienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
