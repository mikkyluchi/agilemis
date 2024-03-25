import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubOutputComponent } from './edit-sub-output.component';

describe('EditSubOutputComponent', () => {
  let component: EditSubOutputComponent;
  let fixture: ComponentFixture<EditSubOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
