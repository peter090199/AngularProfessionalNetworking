import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumVitaeUIComponent } from './curriculum-vitae-ui.component';

describe('CurriculumVitaeUIComponent', () => {
  let component: CurriculumVitaeUIComponent;
  let fixture: ComponentFixture<CurriculumVitaeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumVitaeUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumVitaeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
