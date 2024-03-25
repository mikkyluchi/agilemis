import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoimodalComponent } from './ioimodal.component';

describe('IoimodalComponent', () => {
  let component: IoimodalComponent;
  let fixture: ComponentFixture<IoimodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IoimodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
