import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputimodalComponent } from './outputimodal.component';

describe('OutputimodalComponent', () => {
  let component: OutputimodalComponent;
  let fixture: ComponentFixture<OutputimodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputimodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
