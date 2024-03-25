import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBeneficiariesComponent } from './upload-beneficiaries.component';

describe('UploadBeneficiariesComponent', () => {
  let component: UploadBeneficiariesComponent;
  let fixture: ComponentFixture<UploadBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBeneficiariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
