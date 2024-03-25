import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanuploadmodalComponent } from './planuploadmodal.component';

describe('PlanuploadmodalComponent', () => {
  let component: PlanuploadmodalComponent;
  let fixture: ComponentFixture<PlanuploadmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanuploadmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanuploadmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
