import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguageUIComponent } from './add-language-ui.component';

describe('AddLanguageUIComponent', () => {
  let component: AddLanguageUIComponent;
  let fixture: ComponentFixture<AddLanguageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLanguageUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanguageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
