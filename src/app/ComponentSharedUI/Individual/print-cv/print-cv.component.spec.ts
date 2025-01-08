import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCVComponent } from './print-cv.component';

describe('PrintCVComponent', () => {
  let component: PrintCVComponent;
  let fixture: ComponentFixture<PrintCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
