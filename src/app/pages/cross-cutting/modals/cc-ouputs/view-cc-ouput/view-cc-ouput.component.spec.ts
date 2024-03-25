import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCcOuputComponent } from './view-cc-ouput.component';

describe('ViewCcOuputComponent', () => {
  let component: ViewCcOuputComponent;
  let fixture: ComponentFixture<ViewCcOuputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCcOuputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCcOuputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
