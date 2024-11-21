import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedUIComponent } from './feed-ui.component';

describe('FeedUIComponent', () => {
  let component: FeedUIComponent;
  let fixture: ComponentFixture<FeedUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
