import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveComboMenuDialogComponent } from './save-combo-menu-dialog.component';

describe('SaveComboMenuDialogComponent', () => {
  let component: SaveComboMenuDialogComponent;
  let fixture: ComponentFixture<SaveComboMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveComboMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComboMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
