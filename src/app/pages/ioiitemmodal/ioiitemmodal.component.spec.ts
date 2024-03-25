import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoiitemmodalComponent } from './ioiitemmodal.component';

describe('IoiitemmodalComponent', () => {
  let component: IoiitemmodalComponent;
  let fixture: ComponentFixture<IoiitemmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoiitemmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoiitemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
