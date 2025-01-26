import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLanguageUIComponent } from './view-language-ui.component';

describe('ViewLanguageUIComponent', () => {
  let component: ViewLanguageUIComponent;
  let fixture: ComponentFixture<ViewLanguageUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLanguageUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLanguageUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
