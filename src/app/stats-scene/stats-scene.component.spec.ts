import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSceneComponent } from './stats-scene.component';

describe('StatsSceneComponent', () => {
  let component: StatsSceneComponent;
  let fixture: ComponentFixture<StatsSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
