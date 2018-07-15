import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsControlComponent } from './obs-control.component';

describe('ObsControlComponent', () => {
  let component: ObsControlComponent;
  let fixture: ComponentFixture<ObsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
