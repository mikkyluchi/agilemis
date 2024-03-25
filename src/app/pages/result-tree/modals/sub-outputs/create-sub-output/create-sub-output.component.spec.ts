import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubOutputComponent } from './create-sub-output.component';

describe('CreateSubOutputComponent', () => {
  let component: CreateSubOutputComponent;
  let fixture: ComponentFixture<CreateSubOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
