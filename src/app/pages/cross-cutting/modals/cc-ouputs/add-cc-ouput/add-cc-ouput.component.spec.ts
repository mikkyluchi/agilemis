import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCcOuputComponent } from './add-cc-ouput.component';

describe('AddCcOuputComponent', () => {
  let component: AddCcOuputComponent;
  let fixture: ComponentFixture<AddCcOuputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCcOuputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCcOuputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
