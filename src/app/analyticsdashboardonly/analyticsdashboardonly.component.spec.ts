import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsdashboardonlyComponent } from './analyticsdashboardonly.component';

describe('AnalyticsdashboardonlyComponent', () => {
  let component: AnalyticsdashboardonlyComponent;
  let fixture: ComponentFixture<AnalyticsdashboardonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsdashboardonlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsdashboardonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
