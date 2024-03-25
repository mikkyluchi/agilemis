import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMandateComponent } from './edit-mandate.component';

describe('EditMandateComponent', () => {
  let component: EditMandateComponent;
  let fixture: ComponentFixture<EditMandateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMandateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
