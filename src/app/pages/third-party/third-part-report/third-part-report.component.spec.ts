import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartReportComponent } from './third-part-report.component';

describe('ThirdPartReportComponent', () => {
  let component: ThirdPartReportComponent;
  let fixture: ComponentFixture<ThirdPartReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdPartReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
