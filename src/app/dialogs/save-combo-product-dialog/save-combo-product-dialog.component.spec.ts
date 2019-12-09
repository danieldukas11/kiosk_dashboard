import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveComboProductDialogComponent } from './save-combo-product-dialog.component';

describe('SaveComboProductDialogComponent', () => {
  let component: SaveComboProductDialogComponent;
  let fixture: ComponentFixture<SaveComboProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveComboProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveComboProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
