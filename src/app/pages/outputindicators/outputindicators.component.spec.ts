import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputindicatorsComponent } from './outputindicators.component';

describe('OutputindicatorsComponent', () => {
  let component: OutputindicatorsComponent;
  let fixture: ComponentFixture<OutputindicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputindicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputindicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
