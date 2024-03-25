import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcategoriesComponent } from './projectcategories.component';

describe('ProjectcategoriesComponent', () => {
  let component: ProjectcategoriesComponent;
  let fixture: ComponentFixture<ProjectcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
