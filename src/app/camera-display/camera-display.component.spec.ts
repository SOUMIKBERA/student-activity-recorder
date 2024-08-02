import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraDisplayComponent } from './camera-display.component';

describe('CameraDisplayComponent', () => {
  let component: CameraDisplayComponent;
  let fixture: ComponentFixture<CameraDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
