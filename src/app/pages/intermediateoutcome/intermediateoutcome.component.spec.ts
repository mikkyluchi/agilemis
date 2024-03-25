import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateoutcomeComponent } from './intermediateoutcome.component';

describe('IntermediateoutcomeComponent', () => {
  let component: IntermediateoutcomeComponent;
  let fixture: ComponentFixture<IntermediateoutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntermediateoutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntermediateoutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
