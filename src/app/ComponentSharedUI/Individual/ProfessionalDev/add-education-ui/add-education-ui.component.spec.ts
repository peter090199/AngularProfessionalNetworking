import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationUIComponent } from './add-education-ui.component';

describe('AddEducationUIComponent', () => {
  let component: AddEducationUIComponent;
  let fixture: ComponentFixture<AddEducationUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEducationUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEducationUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
