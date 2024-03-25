import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubInitiativeComponent } from './view-sub-initiative.component';

describe('ViewSubInitiativeComponent', () => {
  let component: ViewSubInitiativeComponent;
  let fixture: ComponentFixture<ViewSubInitiativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubInitiativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
