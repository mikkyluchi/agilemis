import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarteraddComponent } from './quarteradd.component';

describe('QuarteraddComponent', () => {
  let component: QuarteraddComponent;
  let fixture: ComponentFixture<QuarteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarteraddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
