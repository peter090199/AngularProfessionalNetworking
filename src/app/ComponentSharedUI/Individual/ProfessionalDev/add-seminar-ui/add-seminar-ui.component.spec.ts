import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeminarUiComponent } from './add-seminar-ui.component';

describe('AddSeminarUiComponent', () => {
  let component: AddSeminarUiComponent;
  let fixture: ComponentFixture<AddSeminarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeminarUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeminarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
