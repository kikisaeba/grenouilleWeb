import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCsvComponent } from './stats-csv.component';

describe('StatsCsvComponent', () => {
  let component: StatsCsvComponent;
  let fixture: ComponentFixture<StatsCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
