import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VodManageComponent } from './vod-manage.component';

describe('VodManageComponent', () => {
  let component: VodManageComponent;
  let fixture: ComponentFixture<VodManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VodManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VodManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
