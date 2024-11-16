import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredLinkDialogComponent } from './expired-link-dialog.component';

describe('ExpiredLinkDialogComponent', () => {
  let component: ExpiredLinkDialogComponent;
  let fixture: ComponentFixture<ExpiredLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredLinkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
