import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosscuttingissuemodalComponent } from './crosscuttingissuemodal.component';

describe('CrosscuttingissuemodalComponent', () => {
  let component: CrosscuttingissuemodalComponent;
  let fixture: ComponentFixture<CrosscuttingissuemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrosscuttingissuemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrosscuttingissuemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
