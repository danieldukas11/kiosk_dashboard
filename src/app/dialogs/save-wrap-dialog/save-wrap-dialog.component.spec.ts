import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWrapDialogComponent } from './save-wrap-dialog.component';

describe('SaveWrapDialogComponent', () => {
  let component: SaveWrapDialogComponent;
  let fixture: ComponentFixture<SaveWrapDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveWrapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWrapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
