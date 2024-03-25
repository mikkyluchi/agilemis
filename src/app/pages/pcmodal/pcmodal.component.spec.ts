import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcmodalComponent } from './pcmodal.component';

describe('PcmodalComponent', () => {
  let component: PcmodalComponent;
  let fixture: ComponentFixture<PcmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
