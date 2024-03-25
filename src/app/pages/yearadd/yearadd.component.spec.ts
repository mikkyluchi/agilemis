import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearaddComponent } from './yearadd.component';

describe('YearaddComponent', () => {
  let component: YearaddComponent;
  let fixture: ComponentFixture<YearaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
