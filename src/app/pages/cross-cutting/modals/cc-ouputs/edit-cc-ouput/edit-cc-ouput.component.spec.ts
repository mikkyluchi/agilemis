import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCcOuputComponent } from './edit-cc-ouput.component';

describe('EditCcOuputComponent', () => {
  let component: EditCcOuputComponent;
  let fixture: ComponentFixture<EditCcOuputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCcOuputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCcOuputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
