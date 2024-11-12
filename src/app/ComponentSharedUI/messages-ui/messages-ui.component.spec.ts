import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesUIComponent } from './messages-ui.component';

describe('MessagesUIComponent', () => {
  let component: MessagesUIComponent;
  let fixture: ComponentFixture<MessagesUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
