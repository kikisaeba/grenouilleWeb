import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSceneControlComponent } from './stats-scene-control.component';

describe('StatsSceneControlComponent', () => {
  let component: StatsSceneControlComponent;
  let fixture: ComponentFixture<StatsSceneControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsSceneControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSceneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
