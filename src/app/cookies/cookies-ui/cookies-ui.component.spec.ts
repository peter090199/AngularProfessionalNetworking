import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesUIComponent } from './cookies-ui.component';

describe('CookiesUIComponent', () => {
  let component: CookiesUIComponent;
  let fixture: ComponentFixture<CookiesUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
