import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbmcComponent } from './sbmc.component';

describe('SbmcComponent', () => {
  let component: SbmcComponent;
  let fixture: ComponentFixture<SbmcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbmcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
