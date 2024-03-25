import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUploadModalComponent } from './project-upload-modal.component';

describe('ProjectUploadModalComponent', () => {
  let component: ProjectUploadModalComponent;
  let fixture: ComponentFixture<ProjectUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUploadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
