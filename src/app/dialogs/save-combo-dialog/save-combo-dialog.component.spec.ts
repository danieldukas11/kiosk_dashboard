import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveComboDialogComponent } from './save-combo-dialog.component';

describe('SaveComboDialogComponent', () => {
  let component: SaveComboDialogComponent;
  let fixture: ComponentFixture<SaveComboDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveComboDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComboDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
