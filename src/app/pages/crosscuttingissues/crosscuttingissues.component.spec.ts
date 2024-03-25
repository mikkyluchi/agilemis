import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosscuttingissuesComponent } from './crosscuttingissues.component';

describe('CrosscuttingissuesComponent', () => {
  let component: CrosscuttingissuesComponent;
  let fixture: ComponentFixture<CrosscuttingissuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrosscuttingissuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrosscuttingissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
