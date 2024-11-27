import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationUIComponent } from './activation-ui.component';

describe('ActivationUIComponent', () => {
  let component: ActivationUIComponent;
  let fixture: ComponentFixture<ActivationUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
