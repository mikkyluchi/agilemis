import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputiresultmodalComponent } from './outputiresultmodal.component';

describe('OutputiresultmodalComponent', () => {
  let component: OutputiresultmodalComponent;
  let fixture: ComponentFixture<OutputiresultmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputiresultmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputiresultmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
