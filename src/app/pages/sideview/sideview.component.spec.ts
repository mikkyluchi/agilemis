import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideviewComponent } from './sideview.component';

describe('SideviewComponent', () => {
  let component: SideviewComponent;
  let fixture: ComponentFixture<SideviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
