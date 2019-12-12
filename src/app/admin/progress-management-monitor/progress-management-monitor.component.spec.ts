import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressManagementMonitorComponent } from './progress-management-monitor.component';

describe('ProgressManagementMonitorComponent', () => {
  let component: ProgressManagementMonitorComponent;
  let fixture: ComponentFixture<ProgressManagementMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressManagementMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressManagementMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
