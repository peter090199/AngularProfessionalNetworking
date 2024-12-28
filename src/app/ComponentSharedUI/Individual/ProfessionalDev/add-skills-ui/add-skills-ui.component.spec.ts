import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsUIComponent } from './add-skills-ui.component';

describe('AddSkillsUIComponent', () => {
  let component: AddSkillsUIComponent;
  let fixture: ComponentFixture<AddSkillsUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillsUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
