import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKiosksComponent } from './manage-kiosks.component';

describe('ManageKiosksComponent', () => {
  let component: ManageKiosksComponent;
  let fixture: ComponentFixture<ManageKiosksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageKiosksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKiosksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
