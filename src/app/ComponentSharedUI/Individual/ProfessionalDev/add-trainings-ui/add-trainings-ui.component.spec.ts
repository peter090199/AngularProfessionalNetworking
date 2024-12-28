import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingsUiComponent } from './add-trainings-ui.component';

describe('AddTrainingsUiComponent', () => {
  let component: AddTrainingsUiComponent;
  let fixture: ComponentFixture<AddTrainingsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingsUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
