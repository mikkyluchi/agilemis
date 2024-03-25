import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriorityMdaComponent } from './add-priority-mda.component';

describe('AddPriorityMdaComponent', () => {
  let component: AddPriorityMdaComponent;
  let fixture: ComponentFixture<AddPriorityMdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriorityMdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriorityMdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
