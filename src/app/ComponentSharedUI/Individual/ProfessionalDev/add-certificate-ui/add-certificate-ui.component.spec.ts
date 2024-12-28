import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateUiComponent } from './add-certificate-ui.component';

describe('AddCertificateUiComponent', () => {
  let component: AddCertificateUiComponent;
  let fixture: ComponentFixture<AddCertificateUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCertificateUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCertificateUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
