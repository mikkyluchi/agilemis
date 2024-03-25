import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputicommentsmodalComponent } from './outputicommentsmodal.component';

describe('OutputicommentsmodalComponent', () => {
  let component: OutputicommentsmodalComponent;
  let fixture: ComponentFixture<OutputicommentsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputicommentsmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputicommentsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
